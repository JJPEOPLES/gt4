// Advanced layer effects for GT4
// These effects offer more customization than Procreate's layer effects

export interface LayerEffect {
  id: string;
  name: string;
  category: string;
  icon: string;
  settings: {
    [key: string]: {
      type: string;
      min?: number;
      max?: number;
      default: number | string | boolean;
      options?: string[];
    };
  };
  preview: string;
}

// Effect categories that exceed Procreate's offerings
export const effectCategories = [
  { id: 'blur', name: 'Blur', icon: '🌫️' },
  { id: 'distortion', name: 'Distortion', icon: '🌊' },
  { id: 'stylize', name: 'Stylize', icon: '🎭' },
  { id: 'color', name: 'Color Adjustment', icon: '🎨' },
  { id: 'sharpen', name: 'Sharpen', icon: '✨' },
  { id: 'noise', name: 'Noise', icon: '📊' },
  { id: 'lighting', name: 'Lighting', icon: '💡' },
  { id: 'artistic', name: 'Artistic', icon: '🖼️' },
  { id: 'texture', name: 'Texture', icon: '🧶' },
  { id: 'custom', name: 'Custom', icon: '🛠️' },
];

// Sample layer effects that showcase GT4's advanced capabilities
const layerEffects: LayerEffect[] = [
  {
    id: 'gaussian-blur',
    name: 'Gaussian Blur',
    category: 'blur',
    icon: '🌫️',
    settings: {
      radius: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 10
      },
      quality: {
        type: 'select',
        default: 'high',
        options: ['low', 'medium', 'high', 'ultra']
      },
      preserveEdges: {
        type: 'toggle',
        default: false
      }
    },
    preview: '/effect-previews/gaussian-blur.png'
  },
  {
    id: 'motion-blur',
    name: 'Motion Blur',
    category: 'blur',
    icon: '🌫️',
    settings: {
      distance: {
        type: 'slider',
        min: 0,
        max: 200,
        default: 20
      },
      angle: {
        type: 'slider',
        min: 0,
        max: 360,
        default: 0
      },
      centerX: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 50
      },
      centerY: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 50
      }
    },
    preview: '/effect-previews/motion-blur.png'
  },
  {
    id: 'wave-distortion',
    name: 'Wave Distortion',
    category: 'distortion',
    icon: '🌊',
    settings: {
      amplitude: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 20
      },
      wavelength: {
        type: 'slider',
        min: 1,
        max: 200,
        default: 50
      },
      direction: {
        type: 'slider',
        min: 0,
        max: 360,
        default: 0
      },
      phase: {
        type: 'slider',
        min: 0,
        max: 360,
        default: 0
      }
    },
    preview: '/effect-previews/wave-distortion.png'
  },
  {
    id: 'pixelate',
    name: 'Pixelate',
    category: 'stylize',
    icon: '🎭',
    settings: {
      cellSize: {
        type: 'slider',
        min: 1,
        max: 100,
        default: 10
      },
      shape: {
        type: 'select',
        default: 'square',
        options: ['square', 'circle', 'diamond', 'hexagon']
      },
      antialiasing: {
        type: 'toggle',
        default: true
      }
    },
    preview: '/effect-previews/pixelate.png'
  },
  {
    id: 'color-balance',
    name: 'Color Balance',
    category: 'color',
    icon: '🎨',
    settings: {
      redCyan: {
        type: 'slider',
        min: -100,
        max: 100,
        default: 0
      },
      greenMagenta: {
        type: 'slider',
        min: -100,
        max: 100,
        default: 0
      },
      blueYellow: {
        type: 'slider',
        min: -100,
        max: 100,
        default: 0
      },
      preserveLuminosity: {
        type: 'toggle',
        default: true
      },
      toneRange: {
        type: 'select',
        default: 'midtones',
        options: ['shadows', 'midtones', 'highlights', 'all']
      }
    },
    preview: '/effect-previews/color-balance.png'
  },
  {
    id: 'unsharp-mask',
    name: 'Unsharp Mask',
    category: 'sharpen',
    icon: '✨',
    settings: {
      amount: {
        type: 'slider',
        min: 0,
        max: 500,
        default: 100
      },
      radius: {
        type: 'slider',
        min: 0.1,
        max: 10,
        default: 1
      },
      threshold: {
        type: 'slider',
        min: 0,
        max: 255,
        default: 10
      }
    },
    preview: '/effect-previews/unsharp-mask.png'
  },
  {
    id: 'fractal-noise',
    name: 'Fractal Noise',
    category: 'noise',
    icon: '📊',
    settings: {
      scale: {
        type: 'slider',
        min: 1,
        max: 1000,
        default: 100
      },
      roughness: {
        type: 'slider',
        min: 0,
        max: 1,
        default: 0.5
      },
      contrast: {
        type: 'slider',
        min: -100,
        max: 100,
        default: 0
      },
      brightness: {
        type: 'slider',
        min: -100,
        max: 100,
        default: 0
      },
      noiseType: {
        type: 'select',
        default: 'perlin',
        options: ['perlin', 'simplex', 'value', 'worley', 'curl']
      },
      octaves: {
        type: 'slider',
        min: 1,
        max: 10,
        default: 4
      }
    },
    preview: '/effect-previews/fractal-noise.png'
  },
  {
    id: 'light-rays',
    name: 'Light Rays',
    category: 'lighting',
    icon: '💡',
    settings: {
      intensity: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 50
      },
      rayLength: {
        type: 'slider',
        min: 0,
        max: 200,
        default: 100
      },
      centerX: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 50
      },
      centerY: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 50
      },
      color: {
        type: 'color',
        default: '#ffffff'
      },
      blend: {
        type: 'select',
        default: 'screen',
        options: ['screen', 'add', 'overlay', 'soft-light']
      }
    },
    preview: '/effect-previews/light-rays.png'
  },
  {
    id: 'oil-painting',
    name: 'Oil Painting',
    category: 'artistic',
    icon: '🖼️',
    settings: {
      brushSize: {
        type: 'slider',
        min: 1,
        max: 20,
        default: 3
      },
      coarseness: {
        type: 'slider',
        min: 1,
        max: 255,
        default: 15
      },
      detail: {
        type: 'slider',
        min: 0,
        max: 10,
        default: 5
      },
      smoothing: {
        type: 'slider',
        min: 0,
        max: 10,
        default: 3
      }
    },
    preview: '/effect-previews/oil-painting.png'
  },
  {
    id: 'halftone',
    name: 'Halftone',
    category: 'stylize',
    icon: '🎭',
    settings: {
      dotSize: {
        type: 'slider',
        min: 1,
        max: 50,
        default: 5
      },
      spacing: {
        type: 'slider',
        min: 1,
        max: 100,
        default: 10
      },
      angle: {
        type: 'slider',
        min: 0,
        max: 360,
        default: 45
      },
      shape: {
        type: 'select',
        default: 'circle',
        options: ['circle', 'square', 'line', 'cross', 'diamond']
      },
      colorMode: {
        type: 'select',
        default: 'monochrome',
        options: ['monochrome', 'cmyk', 'rgb']
      }
    },
    preview: '/effect-previews/halftone.png'
  }
];

export default layerEffects;