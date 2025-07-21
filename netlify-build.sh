#!/bin/bash
set -e

# Set environment variables
export CI=false
export TSC_COMPILE_ON_ERROR=true
export NODE_OPTIONS=--max_old_space_size=4096

# Install GT4 dependencies with legacy-peer-deps
echo "Installing GT4 dependencies..."
npm install --legacy-peer-deps

# Ensure react-scripts is installed globally
echo "Installing react-scripts globally..."
npm install -g react-scripts

# Build GT4
echo "Building GT4..."
npm run build

# Build GT5
echo "Building GT5..."
cd GT5
echo "Installing GT5 dependencies..."
npm install --legacy-peer-deps

# Ensure react-scripts is available in GT5
echo "Ensuring react-scripts is available in GT5..."
npm link react-scripts

# Build GT5
echo "Building GT5..."
npm run build
cd ..

# Copy GT5 build to main build folder
echo "Copying GT5 build to main build folder..."
mkdir -p build/GT5
cp -r GT5/build/* build/GT5/

echo "Build completed successfully!"