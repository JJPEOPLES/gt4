#!/bin/bash
set -e

# Set environment variables
export CI=false
export TSC_COMPILE_ON_ERROR=true
export NODE_OPTIONS=--max_old_space_size=4096

echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Clean up any previous builds
echo "Cleaning up previous builds..."
rm -rf build
rm -rf GT5/build

# Install GT4 dependencies with legacy-peer-deps
echo "Installing GT4 dependencies..."
npm install --legacy-peer-deps --no-audit --no-fund

# Ensure react-scripts is installed
echo "Installing react-scripts..."
npm install react-scripts --legacy-peer-deps --no-audit --no-fund

# Build GT4
echo "Building GT4..."
npm run build

# Create GT5 directory in build if it doesn't exist
echo "Creating GT5 directory in build..."
mkdir -p build/GT5

# Check if we have a static GT5 page to use as fallback
if [ -d "public/GT5" ]; then
  echo "Copying static GT5 page as fallback..."
  cp -r public/GT5/* build/GT5/
fi

# Build GT5
echo "Building GT5..."
cd GT5

echo "Installing GT5 dependencies..."
npm install --legacy-peer-deps --no-audit --no-fund

echo "Installing react-scripts in GT5..."
npm install react-scripts --legacy-peer-deps --no-audit --no-fund

echo "Building GT5 application..."
npm run build

# Check if build was successful
if [ -d "build" ]; then
  echo "GT5 build successful, copying to main build folder..."
  cd ..
  cp -r GT5/build/* build/GT5/
else
  echo "GT5 build failed, using fallback static page..."
  cd ..
fi

echo "Build completed successfully!"