@echo off
echo Fixing dependency issues...

echo Cleaning npm cache...
call npm cache clean --force

echo Removing node_modules and package-lock.json from GT4...
if exist "node_modules" rmdir /S /Q "node_modules"
if exist "package-lock.json" del "package-lock.json"

echo Removing node_modules and package-lock.json from GT5...
if exist "GT5\node_modules" rmdir /S /Q "GT5\node_modules"
if exist "GT5\package-lock.json" del "GT5\package-lock.json"

echo Reinstalling GT4 dependencies with --legacy-peer-deps...
call npm install --legacy-peer-deps

echo Reinstalling GT5 dependencies with --legacy-peer-deps...
cd GT5
call npm install --legacy-peer-deps
cd ..

echo Dependencies fixed successfully!