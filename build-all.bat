@echo off
echo Building GT4 and GT5...

echo Installing GT4 dependencies...
call npm install --legacy-peer-deps

echo Building GT4...
call npm run build

echo Building GT5...
cd GT5
echo Installing GT5 dependencies...
call npm install --legacy-peer-deps
call npm run build
cd ..

echo Copying GT5 build to main build folder...
if not exist "build\GT5" mkdir "build\GT5"
xcopy /E /I /Y "GT5\build\*" "build\GT5\"

echo Build completed successfully!