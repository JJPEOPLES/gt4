# GT4 and GT5 Deployment Guide

This document provides instructions for deploying both GT4 and GT5 applications together.

## What We've Done

1. Added a "GT5 Beta" link in the GT4 navigation menu
2. Created a static GT5 page as a fallback in `/public/GT5/index.html`
3. Updated the GT5 package.json with `"homepage": "/GT5"` to ensure proper path handling
4. Added back buttons in GT5 to return to GT4
5. Updated the _redirects file to handle GT5 routes
6. Created build and deployment scripts

## Deployment Options

### Option 1: Standard Deployment (with static GT5 page)

```
deploy.bat
```

This uses the existing deployment script which:
1. Builds GT4
2. Copies the static GT5 page from `/public/GT5/` to the build folder
3. Deploys to Netlify

### Option 2: Full Deployment (with GT5 React app)

```
build-gt5.bat
deploy.bat
```

This will:
1. Build the GT5 React application and copy it to the main build folder
2. Run the standard deployment which will then deploy both applications

### Option 3: Test Locally

```
test-deployment.bat
```

This will:
1. Build both GT4 and GT5
2. Set up the combined build folder
3. Start a local server to test the deployment

## Troubleshooting

If you encounter a "Page not found" error for GT5:

1. Make sure the static GT5 page exists in `/public/GT5/index.html`
2. Check that the _redirects file includes the GT5 routes:
   ```
   /GT5    /GT5/index.html   200
   /GT5/    /GT5/index.html   200
   /GT5/*    /GT5/index.html   200
   ```
3. Verify that the GT5 package.json has `"homepage": "/GT5"`
4. Try running just `deploy.bat` to ensure at least the static page is deployed

## Notes

- The GT5 application is configured to be served from the `/GT5` path
- The static GT5 page serves as a fallback if the full application build fails
- Both applications share the same Netlify deployment
- We've added back buttons in GT5 to make navigation between the apps seamless# GT4 and GT5 Deployment Guide

This document provides instructions for deploying both GT4 and GT5 applications together.

## What We've Done

1. Added a "GT5 Beta" link in the GT4 navigation menu
2. Created a static GT5 page as a fallback in `/public/GT5/index.html`
3. Updated the GT5 package.json with `"homepage": "/GT5"` to ensure proper path handling
4. Added back buttons in GT5 to return to GT4
5. Updated the _redirects file to handle GT5 routes
6. Created build and deployment scripts

## Deployment Options

### Option 1: Standard Deployment (with static GT5 page)

```
deploy.bat
```

This uses the existing deployment script which:
1. Builds GT4
2. Copies the static GT5 page from `/public/GT5/` to the build folder
3. Deploys to Netlify

### Option 2: Full Deployment (with GT5 React app)

```
build-gt5.bat
deploy.bat
```

This will:
1. Build the GT5 React application and copy it to the main build folder
2. Run the standard deployment which will then deploy both applications

### Option 3: Test Locally

```
test-deployment.bat
```

This will:
1. Build both GT4 and GT5
2. Set up the combined build folder
3. Start a local server to test the deployment

## Troubleshooting

If you encounter a "Page not found" error for GT5:

1. Make sure the static GT5 page exists in `/public/GT5/index.html`
2. Check that the _redirects file includes the GT5 routes:
   ```
   /GT5    /GT5/index.html   200
   /GT5/    /GT5/index.html   200
   /GT5/*    /GT5/index.html   200
   ```
3. Verify that the GT5 package.json has `"homepage": "/GT5"`
4. Try running just `deploy.bat` to ensure at least the static page is deployed

## Notes

- The GT5 application is configured to be served from the `/GT5` path
- The static GT5 page serves as a fallback if the full application build fails
- Both applications share the same Netlify deployment
- We've added back buttons in GT5 to make navigation between the apps seamless