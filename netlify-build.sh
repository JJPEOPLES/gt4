#!/bin/bash
set -e

# Set environment variables
export CI=false
export TSC_COMPILE_ON_ERROR=true

# Install GT4 dependencies with legacy-peer-deps
echo "Installing GT4 dependencies..."
npm install --legacy-peer-deps

# Build GT4
echo "Building GT4..."
npm run build

# Build GT5
echo "Building GT5..."
cd GT5
echo "Installing GT5 dependencies..."
npm install --legacy-peer-deps
npm run build
cd ..

# Copy GT5 build to main build folder
echo "Copying GT5 build to main build folder..."
mkdir -p build/GT5
cp -r GT5/build/* build/GT5/

echo "Build completed successfully!"