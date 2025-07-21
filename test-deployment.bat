@echo off
echo Testing deployment locally...

echo Building GT4...
call npm run build

echo Building GT5...
cd GT5
call npm run build
cd ..

echo Copying GT5 build to main build folder...
if not exist "build\GT5" mkdir "build\GT5"
xcopy /E /I /Y "GT5\build\*" "build\GT5\"

echo Starting local server...
cd build
npx serve -l 3000

echo Test server stopped.@echo off
echo Testing deployment locally...

echo Building GT4...
call npm run build

echo Building GT5...
cd GT5
call npm run build
cd ..

echo Copying GT5 build to main build folder...
if not exist "build\GT5" mkdir "build\GT5"
xcopy /E /I /Y "GT5\build\*" "build\GT5\"

echo Starting local server...
cd build
npx serve -l 3000

echo Test server stopped.