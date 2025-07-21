// Advanced brush presets for GT4
// These presets offer more customization than Procreate's brushes

export interface BrushPreset {
  id: string;
  name: string;
  category: string;
  icon: string;
  settings: {
    size: number;
    opacity: number;
    flow: number;
    spacing: number;
    hardness: number;
    angle: number;
    roundness: number;
    scatter: number;
    jitter: number;
    // Advanced settings
    pressureSensitivity: number;
    tiltSensitivity: number;
    velocitySensitivity: number;
    blendMode: string;
    textureStrength: number;
    textureScale: number;
    textureId?: string;
    // Dynamics
    sizeJitter: number;
    opacityJitter: number;
    colorJitter: number;
    // Wet media simulation
    wetEdges: number;
    dryRate: number;
    mixRatio: number;
  };
  preview: string;
}

// Brush categories that exceed Procreate's offerings
export const brushCategories = [
  { id: 'painting', name: 'Painting', icon: '🎨' },
  { id: 'sketching', name: 'Sketching', icon: '✏️' },
  { id: 'inking', name: 'Inking', icon: '🖋️' },
  { id: 'watercolor', name: 'Watercolor', icon: '💦' },
  { id: 'airbrush', name: 'Airbrush', icon: '💨' },
  { id: 'texture', name: 'Texture', icon: '🧶' },
  { id: 'fx', name: 'FX', icon: '✨' },
  { id: 'pattern', name: 'Pattern', icon: '🔄' },
  { id: 'calligraphy', name: 'Calligraphy', icon: '📜' },
  { id: 'pixel', name: 'Pixel Art', icon: '🎮' },
  { id: 'charcoal', name: 'Charcoal', icon: '🖤' },
  { id: 'custom', name: 'Custom', icon: '🛠️' },
];

// Blend modes that exceed Procreate's offerings
export const blendModes = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
  // Advanced blend modes not in Procreate
  'vivid-light',
  'linear-light',
  'pin-light',
  'hard-mix',
  'reflect',
  'glow',
  'phoenix',
  'negation',
];

// Sample brush presets that showcase GT4's advanced capabilities
const brushPresets: BrushPreset[] = [
  {
    id: 'oil-paint-pro',
    name: 'Oil Paint Pro',
    category: 'painting',
    icon: '🎨',
    settings: {
      size: 30,
      opacity: 100,
      flow: 85,
      spacing: 10,
      hardness: 50,
      angle: 0,
      roundness: 100,
      scatter: 0,
      jitter: 0,
      pressureSensitivity: 100,
      tiltSensitivity: 80,
      velocitySensitivity: 30,
      blendMode: 'normal',
      textureStrength: 70,
      textureScale: 100,
      textureId: 'canvas',
      sizeJitter: 0,
      opacityJitter: 0,
      colorJitter: 0,
      wetEdges: 80,
      dryRate: 50,
      mixRatio: 70
    },
    preview: '/brush-previews/oil-paint-pro.png'
  },
  {
    id: 'concept-pencil',
    name: 'Concept Pencil',
    category: 'sketching',
    icon: '✏️',
    settings: {
      size: 10,
      opacity: 80,
      flow: 90,
      spacing: 5,
      hardness: 60,
      angle: 45,
      roundness: 80,
      scatter: 10,
      jitter: 20,
      pressureSensitivity: 100,
      tiltSensitivity: 100,
      velocitySensitivity: 50,
      blendMode: 'multiply',
      textureStrength: 40,
      textureScale: 80,
      textureId: 'paper',
      sizeJitter: 10,
      opacityJitter: 15,
      colorJitter: 5,
      wetEdges: 0,
      dryRate: 100,
      mixRatio: 0
    },
    preview: '/brush-previews/concept-pencil.png'
  },
  {
    id: 'wet-acrylic',
    name: 'Wet Acrylic',
    category: 'painting',
    icon: '🎨',
    settings: {
      size: 40,
      opacity: 95,
      flow: 100,
      spacing: 1,
      hardness: 30,
      angle: 0,
      roundness: 100,
      scatter: 0,
      jitter: 0,
      pressureSensitivity: 90,
      tiltSensitivity: 70,
      velocitySensitivity: 40,
      blendMode: 'normal',
      textureStrength: 50,
      textureScale: 100,
      textureId: 'rough',
      sizeJitter: 0,
      opacityJitter: 10,
      colorJitter: 5,
      wetEdges: 100,
      dryRate: 20,
      mixRatio: 90
    },
    preview: '/brush-previews/wet-acrylic.png'
  },
  {
    id: 'ink-pen-pro',
    name: 'Ink Pen Pro',
    category: 'inking',
    icon: '🖋️',
    settings: {
      size: 5,
      opacity: 100,
      flow: 100,
      spacing: 1,
      hardness: 100,
      angle: 0,
      roundness: 100,
      scatter: 0,
      jitter: 0,
      pressureSensitivity: 80,
      tiltSensitivity: 60,
      velocitySensitivity: 30,
      blendMode: 'normal',
      textureStrength: 0,
      textureScale: 100,
      sizeJitter: 0,
      opacityJitter: 0,
      colorJitter: 0,
      wetEdges: 20,
      dryRate: 80,
      mixRatio: 0
    },
    preview: '/brush-previews/ink-pen-pro.png'
  },
  {
    id: 'watercolor-splash',
    name: 'Watercolor Splash',
    category: 'watercolor',
    icon: '💦',
    settings: {
      size: 50,
      opacity: 70,
      flow: 80,
      spacing: 15,
      hardness: 10,
      angle: 0,
      roundness: 100,
      scatter: 40,
      jitter: 30,
      pressureSensitivity: 100,
      tiltSensitivity: 90,
      velocitySensitivity: 70,
      blendMode: 'multiply',
      textureStrength: 60,
      textureScale: 120,
      textureId: 'watercolor',
      sizeJitter: 30,
      opacityJitter: 40,
      colorJitter: 10,
      wetEdges: 100,
      dryRate: 30,
      mixRatio: 100
    },
    preview: '/brush-previews/watercolor-splash.png'
  },
  {
    id: 'pixel-perfect',
    name: 'Pixel Perfect',
    category: 'pixel',
    icon: '🎮',
    settings: {
      size: 10,
      opacity: 100,
      flow: 100,
      spacing: 100,
      hardness: 100,
      angle: 0,
      roundness: 0,
      scatter: 0,
      jitter: 0,
      pressureSensitivity: 0,
      tiltSensitivity: 0,
      velocitySensitivity: 0,
      blendMode: 'normal',
      textureStrength: 0,
      textureScale: 100,
      sizeJitter: 0,
      opacityJitter: 0,
      colorJitter: 0,
      wetEdges: 0,
      dryRate: 100,
      mixRatio: 0
    },
    preview: '/brush-previews/pixel-perfect.png'
  },
  {
    id: 'particle-spray',
    name: 'Particle Spray',
    category: 'fx',
    icon: '✨',
    settings: {
      size: 100,
      opacity: 50,
      flow: 70,
      spacing: 20,
      hardness: 50,
      angle: 0,
      roundness: 100,
      scatter: 100,
      jitter: 100,
      pressureSensitivity: 80,
      tiltSensitivity: 50,
      velocitySensitivity: 90,
      blendMode: 'screen',
      textureStrength: 0,
      textureScale: 100,
      sizeJitter: 100,
      opacityJitter: 80,
      colorJitter: 30,
      wetEdges: 0,
      dryRate: 100,
      mixRatio: 0
    },
    preview: '/brush-previews/particle-spray.png'
  },
  {
    id: 'charcoal-stick',
    name: 'Charcoal Stick',
    category: 'charcoal',
    icon: '🖤',
    settings: {
      size: 20,
      opacity: 90,
      flow: 85,
      spacing: 5,
      hardness: 40,
      angle: 45,
      roundness: 70,
      scatter: 10,
      jitter: 20,
      pressureSensitivity: 100,
      tiltSensitivity: 100,
      velocitySensitivity: 60,
      blendMode: 'multiply',
      textureStrength: 80,
      textureScale: 100,
      textureId: 'charcoal',
      sizeJitter: 15,
      opacityJitter: 20,
      colorJitter: 5,
      wetEdges: 10,
      dryRate: 90,
      mixRatio: 20
    },
    preview: '/brush-previews/charcoal-stick.png'
  }
];

export default brushPresets;