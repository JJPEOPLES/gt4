@echo off
echo GT4 Drawing Engine - Direct Deployment Script
echo ============================================
echo.
echo This script will deploy the build directory directly to Netlify
echo without running the build process.
echo.
echo Deploying to Netlify...
netlify deploy --prod --dir=build
if %ERRORLEVEL% NEQ 0 (
  echo Error: Deployment failed!
  exit /b %ERRORLEVEL%
)
echo.
echo Deployment completed successfully!
echo Your app is now live at: https://GT4draw.netlify.app
echo.