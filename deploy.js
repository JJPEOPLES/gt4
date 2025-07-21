// Simple deploy script for Netlify
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the build directory exists
if (!fs.existsSync(path.join(__dirname, 'build'))) {
  fs.mkdirSync(path.join(__dirname, 'build'), { recursive: true });
}

// Copy public assets to build folder
console.log('Copying public assets to build folder...');
if (fs.existsSync(path.join(__dirname, 'public'))) {
  fs.cpSync(path.join(__dirname, 'public'), path.join(__dirname, 'build'), { recursive: true });
}

// Ensure GT5 static page is available
console.log('Checking for GT5 static page...');
if (!fs.existsSync(path.join(__dirname, 'build', 'GT5'))) {
  console.log('Creating GT5 directory in build folder...');
  fs.mkdirSync(path.join(__dirname, 'build', 'GT5'), { recursive: true });
}

// Copy GT5 static page if it exists in public folder
if (fs.existsSync(path.join(__dirname, 'public', 'GT5'))) {
  console.log('Copying GT5 static page from public folder...');
  fs.cpSync(path.join(__dirname, 'public', 'GT5'), path.join(__dirname, 'build', 'GT5'), { recursive: true });
}

// Build GT5 if it exists
console.log('Checking for GT5 app...');
if (fs.existsSync(path.join(__dirname, 'GT5'))) {
  console.log('Building GT5 app...');
  try {
    // Copy GT5 public assets if they don't already exist in build/GT5
    if (fs.existsSync(path.join(__dirname, 'GT5', 'public'))) {
      console.log('Copying GT5 app public assets...');
      
      // Copy each file individually to avoid overwriting the static page
      const files = fs.readdirSync(path.join(__dirname, 'GT5', 'public'));
      files.forEach(file => {
        if (file !== 'index.html') { // Don't overwrite the static index.html
          const sourcePath = path.join(__dirname, 'GT5', 'public', file);
          const destPath = path.join(__dirname, 'build', 'GT5', file);
          
          if (fs.statSync(sourcePath).isDirectory()) {
            fs.cpSync(sourcePath, destPath, { recursive: true });
          } else {
            fs.copyFileSync(sourcePath, destPath);
          }
        }
      });
    }
    
    console.log('GT5 assets copied successfully!');
  } catch (error) {
    console.error('Error building GT5:', error);
  }
}

// Create a simple index.html if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'build', 'index.html'))) {
  console.log('Creating a simple index.html...');
  fs.writeFileSync(
    path.join(__dirname, 'build', 'index.html'),
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GT4 Drawing Engine</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #121212;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      text-align: center;
      overflow: hidden;
      position: relative;
    }
    
    .grid-pattern {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('/grid-pattern.svg');
      background-size: 30px 30px;
      opacity: 0.05;
      pointer-events: none;
    }
    
    .container {
      z-index: 1;
      max-width: 800px;
      padding: 2rem;
    }
    
    h1 {
      color: #6200EA;
      font-size: 3.5rem;
      margin-bottom: 1rem;
      font-weight: 800;
    }
    
    h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
      color: #B388FF;
      font-weight: 600;
    }
    
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: rgba(255, 255, 255, 0.7);
      max-width: 600px;
      line-height: 1.6;
    }
    
    .logo {
      width: 150px;
      height: 150px;
      background: linear-gradient(135deg, #6200EA, #03DAC6);
      border-radius: 50%;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      font-weight: bold;
      color: white;
      box-shadow: 0 10px 30px rgba(98, 0, 234, 0.3);
    }
    
    .button {
      display: inline-block;
      background-color: #6200EA;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.3s ease;
      margin-top: 1rem;
      box-shadow: 0 5px 15px rgba(98, 0, 234, 0.3);
    }
    
    .button:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(98, 0, 234, 0.4);
    }
    
    .glow {
      position: absolute;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: rgba(98, 0, 234, 0.2);
      filter: blur(80px);
      z-index: 0;
    }
    
    .glow-1 {
      top: -100px;
      right: -100px;
    }
    
    .glow-2 {
      bottom: -100px;
      left: -100px;
      background: rgba(3, 218, 198, 0.2);
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    .fade-in {
      animation: fadeIn 1s ease-in-out;
    }
  </style>
</head>
<body>
  <div class="grid-pattern"></div>
  <div class="glow glow-1"></div>
  <div class="glow glow-2"></div>
  
  <div class="container fade-in">
    <div class="logo">GT4</div>
    <h1>GT4 Drawing Engine</h1>
    <h2>Better than Procreate. Free for everyone.</h2>
    <p>A professional-grade drawing application that runs in your browser. Create stunning digital art with tools that rival expensive software.</p>
    <a href="#" class="button">Coming Soon</a>
  </div>
</body>
</html>`
  );
}

// Deploy to Netlify
console.log('Deploying to Netlify...');
try {
  execSync('netlify deploy --prod', { stdio: 'inherit' });
  console.log('Deployment successful!');
} catch (error) {
  console.error('Deployment failed:', error);
  process.exit(1);
}