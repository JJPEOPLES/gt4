@echo off
echo Switching back to full App.tsx...

if exist "src\App.full.tsx" (
  echo Restoring original App.tsx...
  copy "src\App.full.tsx" "src\App.tsx"
  echo Done! Now using full version of App.tsx
) else (
  echo Error: Full version backup not found.
  echo Run use-simple-app.bat first to create a backup.
)