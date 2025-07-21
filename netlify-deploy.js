// Simple deploy script for Netlify
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('GT4 Drawing Engine - Netlify Deployment Script');
console.log('=============================================');
console.log('');

// Check if build directory exists
if (!fs.existsSync(path.join(__dirname, 'build'))) {
  console.log('Creating build directory...');
  fs.mkdirSync(path.join(__dirname, 'build'), { recursive: true });
}

// Copy public assets to build folder
console.log('Copying public assets to build folder...');
if (fs.existsSync(path.join(__dirname, 'public'))) {
  // Copy each file individually to avoid errors
  const publicFiles = fs.readdirSync(path.join(__dirname, 'public'));
  publicFiles.forEach(file => {
    const sourcePath = path.join(__dirname, 'public', file);
    const destPath = path.join(__dirname, 'build', file);
    
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied: ${file}`);
    }
  });
}

// Create a simple index.html if it doesn't exist in build
if (!fs.existsSync(path.join(__dirname, 'build', 'index.html'))) {
  console.log('Creating a simple index.html in build directory...');
  fs.copyFileSync(
    path.join(__dirname, 'public', 'index.html'),
    path.join(__dirname, 'build', 'index.html')
  );
}

// Deploy to Netlify
console.log('');
console.log('Deploying to Netlify...');
try {
  // Use --dir=build to specify the directory to deploy
  execSync('netlify deploy --prod --dir=build', { stdio: 'inherit' });
  console.log('');
  console.log('Deployment successful!');
  console.log('Your app is now live at: https://GT4draw.netlify.app');
} catch (error) {
  console.error('Deployment failed:', error);
  process.exit(1);
}