# GT5 Drawing Engine

GT5 is a next-generation web-based drawing application built with React and TypeScript. It offers a professional-grade digital art creation experience directly in your browser.

## Deployment to Netlify

This repository is set up to be deployed to Netlify as a standalone application at https://gt5draw.netlify.app.

### Deployment Steps

1. Create a new site in Netlify
2. Connect to this repository
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Base directory: (leave blank)

### Environment Variables

Add the following environment variables in Netlify:

- `CI=false` - Prevents the build from failing on warnings
- `NODE_VERSION=16` - Ensures the correct Node.js version is used

### Redirects

Add the following redirects in your `netlify.toml` file:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Features

- **AI-Enhanced Brushes**: Experience next-gen brushes with AI-powered stroke prediction and automatic smoothing for professional results.
- **Smart Layers**: Work with intelligent layers that automatically organize and suggest optimal blending modes for your artwork.
- **Color Harmony System**: Create perfect color schemes with our advanced harmony system that suggests complementary colors as you work.
- **Cloud Collaboration**: Collaborate in real-time with other artists and export your work in multiple professional formats.

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install --legacy-peer-deps
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Building for Production

```
npm run build
```

This builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Technologies Used

- React
- TypeScript
- Material-UI
- React Konva for canvas manipulation

## Keyboard Shortcuts

GT5 supports various keyboard shortcuts for a faster workflow:

- **B**: Brush tool
- **P**: Pencil tool
- **E**: Eraser tool
- **R**: Rectangle tool
- **C**: Circle tool
- **L**: Line tool
- **T**: Text tool
- **H**: Hand tool (pan)
- **I**: Eyedropper tool
- **Ctrl+Z**: Undo
- **Ctrl+Y** or **Ctrl+Shift+Z**: Redo
- **[**: Decrease brush size
- **]**: Increase brush size

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── DrawingEngine/  # Drawing engine components
│   └── LandingPage/    # Landing page components
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── styles/          # CSS styles
└── utils/           # Utility functions
```

## Integration with GT4

GT4 links to this application using absolute URLs to https://gt5draw.netlify.app. If you change the deployment URL, make sure to update the links in the GT4 application.

## License

This project is licensed under the MIT License.