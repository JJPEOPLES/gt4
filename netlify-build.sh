#!/bin/bash
set -e

# Build GT4
echo "Building GT4..."
npm run build

# Build GT5
echo "Building GT5..."
cd GT5
npm install
npm run build
cd ..

# Copy GT5 build to main build folder
echo "Copying GT5 build to main build folder..."
mkdir -p build/GT5
cp -r GT5/build/* build/GT5/

echo "Build completed successfully!"