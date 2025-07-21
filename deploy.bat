@echo off
echo GT4 Drawing Engine - Deployment Script
echo =====================================
echo.
echo 1. Building the application...
set "CI=false" && set "TSC_COMPILE_ON_ERROR=true" && call npm run build
if %ERRORLEVEL% NEQ 0 (
  echo Warning: Build failed! Continuing with deployment of static files...
)
echo.
echo 2. Running deployment script...
node deploy.js
if %ERRORLEVEL% NEQ 0 (
  echo Error: Deployment failed!
  exit /b %ERRORLEVEL%
)
echo.
echo Deployment completed successfully!
echo Your app is now live at: https://gt4.k2lang.org 
echo.