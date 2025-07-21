@echo off
echo ===================================
echo Building and Deploying GT4 and GT5
echo ===================================

echo.
echo Step 1: Building GT4...
call npm install -legacy-peer-deps
call npm run build
echo GT4 build completed!

echo.
echo Step 2: Building GT5...
call build-gt5.bat

echo.
echo Step 3: Deploying to Netlify...
call netlify deploy --prod

echo.
echo Deployment completed!
