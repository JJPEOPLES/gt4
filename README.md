# GT4 and GT5 Drawing Engine

This repository contains both GT4 and GT5 drawing applications.

## GT4

GT4 is a powerful web-based drawing engine designed for artists who want professional-grade tools without the high cost of software like Procreate. Built with React and modern web technologies, GT4 offers a comprehensive suite of drawing tools, effects, and AI-powered features that exceed what's available in many commercial applications.

## GT5

GT5 is our next-generation drawing application with AI-enhanced brushes, smart layers, and a completely redesigned interface. It's currently in beta and can be accessed at `/GT5` when deployed.

## Deployment

For detailed deployment instructions, see:
- [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) - Instructions for deploying to Netlify
- [DEPLOYMENT.md](./DEPLOYMENT.md) - General deployment information

## Setting Up the Creator Account

GT4 has a special "Prime" account that is reserved for the creator of the application. This account has special administrative privileges.

### Initial Setup

1. After deploying the application, navigate to `/init-creator` in your browser
2. Fill in the email and password you want to use for the Prime creator account
3. Click "Initialize Creator Account"
4. Once initialized, you'll be redirected to the creator login page

### Logging In as Creator

1. Navigate to `/creator-login` in your browser (or click the "Creator" link in the footer)
2. Enter the email and password you used during initialization
3. You'll be logged in as "Prime" with creator privileges

### Creator Privileges

As the Prime creator account, you have access to:

- Admin panel at `/admin`
- User management (view, edit, block users)
- Artwork management (view, delete artworks)
- Collaboration management (view, manage collaborations)
- Special "Creator" badge on your profile and artworks

## Live User Count

GT4 includes a real-time user counting system that shows how many users are currently online. This count is displayed in the header of both the landing page and the drawing application.

## Features That Make GT4 Better Than Procreate

### 1. Advanced Brush Engine
- **Dynamic Brush System**: Create and customize brushes with more parameters than Procreate
- **Physics-Based Brushes**: Realistic media simulation including wet edges, drying effects, and paint mixing
- **Pressure & Tilt Sensitivity**: Full support for pressure-sensitive devices with customizable response curves
- **Texture Mapping**: Apply and customize textures to any brush with granular control

### 2. Layer System
- **Unlimited Layers**: No arbitrary layer limits like in Procreate
- **Advanced Blend Modes**: More blend modes than Procreate, including advanced options like Vivid Light, Linear Light, and Hard Mix
- **Non-Destructive Adjustments**: Apply and modify adjustments at any time without altering your original artwork
- **Smart Layer Groups**: Organize your work with nested groups and apply effects to entire groups

### 3. AI-Powered Features
- **Text-to-Image Generation**: Generate artwork from text descriptions
- **Style Transfer**: Apply the style of any reference image to your artwork
- **Smart Selection**: AI-powered selection tools that understand objects and subjects
- **Auto Colorization**: Automatically add color to line art or grayscale images
- **Perspective Correction**: Fix perspective issues automatically
- **Animation Assistant**: Create smooth animations from keyframes

### 4. Export Options
- **More File Formats**: Export to PNG, JPEG, WebP, SVG, PSD, TIFF, PDF, GIF, AVIF, and native GT4 format
- **Batch Export**: Export multiple artworks or layers at once
- **Advanced Settings**: Fine-tune export settings with more options than Procreate
- **Web Optimization**: Special export presets optimized for web and social media

### 5. Web-Based Advantages
- **Cross-Platform**: Works on any device with a modern web browser
- **No Installation Required**: Start creating immediately without downloads
- **Automatic Cloud Saving**: Never lose your work with automatic cloud backups
- **Collaboration Features**: Share and collaborate on projects in real-time
- **Regular Updates**: Continuous improvements without waiting for app store approval

## Getting Started

1. Clone the repository
```
git clone https://github.com/yourusername/GT4.git
```

2. Install dependencies with legacy-peer-deps flag
```
cd GT4
npm install --legacy-peer-deps
```

3. Set up environment variables
   - Copy `.env.example` to `.env`
   - Fill in your Supabase credentials (see [Supabase Setup](#supabase-setup) below)

4. Start the development server
```
npm start
```

5. To start GT5 development server
```
cd GT5
npm install --legacy-peer-deps
npm start
```

6. Build both applications for production
```
./build-all.bat
```

7. Deploy to Netlify
```
npm run deploy
```

## Supabase Setup

GT4 uses Supabase for authentication, database, and storage. Follow these steps to set up your Supabase project:

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from Settings > API
4. Add these credentials to your `.env` file:
   ```
   REACT_APP_SUPABASE_URL=your-project-url
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
   ```
5. Set up the database schema by running the SQL script in `supabase/setup.sql`
6. Enable Email Auth in Authentication > Providers
7. Initialize the creator account by visiting `/supabase-init-creator` in your app

For detailed instructions, see [supabase/README.md](supabase/README.md)

## System Requirements

- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Input Devices**: Mouse, trackpad, or graphics tablet
- **For Best Experience**: Graphics tablet with pressure sensitivity

## Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## License

GT4 is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all the open-source projects that made GT4 possible
- Special thanks to our community of artists who provide valuable feedback