# GT5 Drawing Engine

GT5 is a next-generation web-based drawing application built with React and TypeScript. It offers a professional-grade digital art creation experience directly in your browser.

## Features

- **AI-Enhanced Brushes**: Experience next-gen brushes with AI-powered stroke prediction and automatic smoothing for professional results.
- **Smart Layers**: Work with intelligent layers that automatically organize and suggest optimal blending modes for your artwork.
- **Color Harmony System**: Create perfect color schemes with our advanced harmony system that suggests complementary colors as you work.
- **Cloud Collaboration**: Collaborate in real-time with other artists and export your work in multiple professional formats.

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
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

## License

This project is licensed under the MIT License.