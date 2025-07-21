// Advanced AI features for GT4
// These AI-powered features exceed Procreate's capabilities

export interface AIFeature {
  id: string;
  name: string;
  category: string;
  description: string;
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

// AI feature categories that Procreate doesn't offer
export const aiCategories = [
  { id: 'generation', name: 'Image Generation', icon: '🧠' },
  { id: 'enhancement', name: 'Enhancement', icon: '✨' },
  { id: 'style', name: 'Style Transfer', icon: '🎨' },
  { id: 'composition', name: 'Composition', icon: '🖼️' },
  { id: 'animation', name: 'Animation', icon: '🎬' },
  { id: 'correction', name: 'Auto Correction', icon: '🔧' },
  { id: 'selection', name: 'Smart Selection', icon: '✂️' },
  { id: 'colorization', name: 'Colorization', icon: '🌈' },
  { id: 'upscaling', name: 'Upscaling', icon: '🔍' },
];

// Sample AI features that showcase GT4's advanced capabilities
const aiFeatures: AIFeature[] = [
  {
    id: 'text-to-image',
    name: 'Text to Image',
    category: 'generation',
    description: 'Generate images from text descriptions using advanced AI models.',
    icon: '🧠',
    settings: {
      prompt: {
        type: 'text',
        default: 'A beautiful landscape with mountains and a lake'
      },
      negativePrompt: {
        type: 'text',
        default: 'blurry, low quality, distorted'
      },
      model: {
        type: 'select',
        default: 'stable-diffusion-xl',
        options: ['stable-diffusion-xl', 'midjourney-style', 'realistic-vision', 'anime-style']
      },
      steps: {
        type: 'slider',
        min: 10,
        max: 150,
        default: 30
      },
      guidanceScale: {
        type: 'slider',
        min: 1,
        max: 20,
        default: 7.5
      },
      seed: {
        type: 'number',
        default: -1
      },
      applyToSelection: {
        type: 'toggle',
        default: false
      }
    },
    preview: '/ai-previews/text-to-image.png'
  },
  {
    id: 'image-to-image',
    name: 'Image to Image',
    category: 'generation',
    description: 'Transform existing artwork using AI while maintaining composition.',
    icon: '🧠',
    settings: {
      prompt: {
        type: 'text',
        default: 'Transform into a watercolor painting'
      },
      strength: {
        type: 'slider',
        min: 0,
        max: 1,
        default: 0.7
      },
      preserveStructure: {
        type: 'toggle',
        default: true
      },
      model: {
        type: 'select',
        default: 'stable-diffusion-xl',
        options: ['stable-diffusion-xl', 'midjourney-style', 'realistic-vision', 'anime-style']
      },
      steps: {
        type: 'slider',
        min: 10,
        max: 150,
        default: 30
      }
    },
    preview: '/ai-previews/image-to-image.png'
  },
  {
    id: 'smart-upscale',
    name: 'Smart Upscale',
    category: 'upscaling',
    description: 'Increase image resolution while enhancing details using AI.',
    icon: '🔍',
    settings: {
      scale: {
        type: 'select',
        default: '4x',
        options: ['2x', '4x', '8x', '16x']
      },
      enhanceDetails: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 50
      },
      reduceNoise: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 30
      },
      preserveColors: {
        type: 'toggle',
        default: true
      },
      model: {
        type: 'select',
        default: 'real-esrgan',
        options: ['real-esrgan', 'swinir', 'gfpgan', 'custom']
      }
    },
    preview: '/ai-previews/smart-upscale.png'
  },
  {
    id: 'style-transfer',
    name: 'Style Transfer',
    category: 'style',
    description: 'Apply the style of famous artists or custom references to your artwork.',
    icon: '🎨',
    settings: {
      style: {
        type: 'select',
        default: 'custom',
        options: ['van-gogh', 'picasso', 'monet', 'anime', 'pixel-art', 'custom']
      },
      strength: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 75
      },
      preserveColors: {
        type: 'toggle',
        default: false
      },
      preserveDetails: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 50
      },
      referenceImage: {
        type: 'image',
        default: ''
      }
    },
    preview: '/ai-previews/style-transfer.png'
  },
  {
    id: 'smart-selection',
    name: 'Smart Selection',
    category: 'selection',
    description: 'Automatically select objects, people, or areas in your artwork with AI precision.',
    icon: '✂️',
    settings: {
      mode: {
        type: 'select',
        default: 'object',
        options: ['object', 'person', 'background', 'color', 'custom']
      },
      precision: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 80
      },
      featherEdges: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 20
      },
      includeSubjects: {
        type: 'toggle',
        default: true
      }
    },
    preview: '/ai-previews/smart-selection.png'
  },
  {
    id: 'auto-colorize',
    name: 'Auto Colorize',
    category: 'colorization',
    description: 'Automatically add realistic colors to grayscale or line art.',
    icon: '🌈',
    settings: {
      style: {
        type: 'select',
        default: 'realistic',
        options: ['realistic', 'vibrant', 'pastel', 'anime', 'custom']
      },
      intensity: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 80
      },
      preserveShading: {
        type: 'toggle',
        default: true
      },
      colorHint: {
        type: 'toggle',
        default: false
      }
    },
    preview: '/ai-previews/auto-colorize.png'
  },
  {
    id: 'perspective-correction',
    name: 'Perspective Correction',
    category: 'correction',
    description: 'Automatically fix perspective issues in your artwork.',
    icon: '🔧',
    settings: {
      mode: {
        type: 'select',
        default: 'auto',
        options: ['auto', 'one-point', 'two-point', 'custom']
      },
      strength: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 70
      },
      preserveProportions: {
        type: 'toggle',
        default: true
      },
      fillGaps: {
        type: 'toggle',
        default: true
      }
    },
    preview: '/ai-previews/perspective-correction.png'
  },
  {
    id: 'animation-assistant',
    name: 'Animation Assistant',
    category: 'animation',
    description: 'Create smooth animations from keyframes using AI interpolation.',
    icon: '🎬',
    settings: {
      frames: {
        type: 'slider',
        min: 1,
        max: 120,
        default: 24
      },
      smoothness: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 80
      },
      motionType: {
        type: 'select',
        default: 'linear',
        options: ['linear', 'ease-in', 'ease-out', 'ease-in-out', 'bounce']
      },
      looping: {
        type: 'toggle',
        default: true
      }
    },
    preview: '/ai-previews/animation-assistant.png'
  },
  {
    id: 'composition-guide',
    name: 'Composition Guide',
    category: 'composition',
    description: 'Get AI-powered suggestions to improve your artwork composition.',
    icon: '🖼️',
    settings: {
      rule: {
        type: 'select',
        default: 'thirds',
        options: ['thirds', 'golden-ratio', 'symmetry', 'radial', 'dynamic']
      },
      showGrid: {
        type: 'toggle',
        default: true
      },
      suggestCrop: {
        type: 'toggle',
        default: true
      },
      suggestRebalance: {
        type: 'toggle',
        default: true
      }
    },
    preview: '/ai-previews/composition-guide.png'
  },
  {
    id: 'line-refinement',
    name: 'Line Refinement',
    category: 'enhancement',
    description: 'Clean up and refine hand-drawn lines with AI precision.',
    icon: '✨',
    settings: {
      smoothness: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 50
      },
      pressure: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 70
      },
      consistency: {
        type: 'slider',
        min: 0,
        max: 100,
        default: 80
      },
      preserveStyle: {
        type: 'toggle',
        default: true
      }
    },
    preview: '/ai-previews/line-refinement.png'
  }
];

export default aiFeatures;