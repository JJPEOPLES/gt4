# Netlify Deployment Guide for GT4 and GT5

This guide explains how to deploy both GT4 and GT5 applications to Netlify.

## What We've Done

1. Updated the Netlify configuration to build both GT4 and GT5
2. Added a custom build script that:
   - Builds GT4
   - Builds GT5
   - Copies GT5 build files to the main build folder
3. Added redirects to handle GT5 routes

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

## Testing Locally

To test the deployment locally:

```
npm run build:all
cd build
npx serve
```

This will build both applications and serve them locally, simulating the Netlify deployment.