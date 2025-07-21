@echo off
echo Building GT5 application...

cd GT5
call npm install
call npm run build

if not exist "..\build\GT5" mkdir "..\build\GT5"
echo Copying GT5 build to main build folder...
xcopy /E /I /Y "build\*" "..\build\GT5\"

cd ..
echo GT5 build completed successfully!@echo off
echo Building GT5 application...

cd GT5
call npm install
call npm run build

if not exist "..\build\GT5" mkdir "..\build\GT5"
echo Copying GT5 build to main build folder...
xcopy /E /I /Y "build\*" "..\build\GT5\"

cd ..
echo GT5 build completed successfully!