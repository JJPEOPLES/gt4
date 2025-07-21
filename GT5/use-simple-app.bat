@echo off
echo Switching to simple App.tsx for more reliable builds...

if not exist "src\App.full.tsx" (
  echo Backing up original App.tsx...
  copy "src\App.tsx" "src\App.full.tsx"
)

echo Copying simple version to App.tsx...
copy "src\App.simple.tsx" "src\App.tsx"

echo Done! Now using simple version of App.tsx