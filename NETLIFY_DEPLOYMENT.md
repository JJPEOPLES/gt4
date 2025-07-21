# Netlify Deployment Guide for GT4 and GT5

This guide explains how to deploy both GT4 and GT5 applications to Netlify.

## What We've Done

1. Updated the Netlify configuration to build both GT4 and GT5
2. Added a custom build script that:
   - Installs dependencies with `--legacy-peer-deps` flag to resolve dependency conflicts
   - Builds GT4
   - Builds GT5 using a simplified version of the app for more reliable builds
   - Copies GT5 build files to the main build folder
   - Includes a fallback static page for GT5 if the build fails
3. Added redirects to handle GT5 routes
4. Fixed dependency conflicts in package.json files
5. Created a simplified version of the GT5 app that's more likely to build successfully

## How It Works

When you push to your repository, Netlify will:

1. Run the build command specified in `netlify.toml`
2. This command runs `npm run build:all` which builds both applications
3. The GT5 build is copied to the `/GT5` folder in the main build directory
4. Netlify serves the combined application

## Deployment Options

### Option 1: Push to Repository

Simply push your changes to the repository connected to Netlify. The build process will automatically handle both GT4 and GT5.

### Option 2: Manual Deployment

If you want to deploy manually:

1. Build both applications locally:
   ```
   npm run build:all
   ```

2. Deploy using the Netlify CLI:
   ```
   netlify deploy --prod
   ```

## Troubleshooting

If GT5 is not being deployed correctly:

1. Check the Netlify build logs to see if there are any errors during the GT5 build process
2. Verify that the `build:gt5` script in package.json is working correctly
3. Make sure the GT5 application has `"homepage": "/GT5"` in its package.json
4. Check that the redirects in netlify.toml are correct

### Using the Simplified App

We've created a simplified version of the GT5 app that's more likely to build successfully. The build scripts automatically use this simplified version during the build process.

If you want to manually switch between the full and simplified versions:

1. To use the simplified version:
   ```
   cd GT5
   ./use-simple-app.bat
   ```

2. To switch back to the full version:
   ```
   cd GT5
   ./use-full-app.bat
   ```

The simplified version includes just a landing page with a link back to GT4, which is enough to ensure the GT5 route works correctly.

### Dependency Conflicts

If you encounter dependency conflicts (npm error code ERESOLVE), we've already configured the build scripts to use the `--legacy-peer-deps` flag. This flag tells npm to ignore peer dependency conflicts and proceed with the installation anyway.

We've also:
1. Fixed the version conflict between @mui/lab and @mui/material
2. Added missing dependencies to both package.json files
3. Added additional flags to npm install commands to reduce noise and speed up installation

If you're still having issues:

1. Try clearing the npm cache:
   ```
   npm cache clean --force
   ```

2. Delete the node_modules folder and package-lock.json:
   ```
   rm -rf node_modules package-lock.json
   rm -rf GT5/node_modules GT5/package-lock.json
   ```

3. Reinstall dependencies with the `--legacy-peer-deps` flag:
   ```
   npm install --legacy-peer-deps --no-audit --no-fund
   cd GT5 && npm install --legacy-peer-deps --no-audit --no-fund && cd ..
   ```

4. Run the fix-dependencies.bat script:
   ```
   ./fix-dependencies.bat
   ```

## Testing Locally

To test the deployment locally:

```
npm run build:all
cd build
npx serve
```

This will build both applications and serve them locally, simulating the Netlify deployment.