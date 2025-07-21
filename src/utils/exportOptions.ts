// Advanced export options for GT4
// These export options exceed Procreate's capabilities

export interface ExportFormat {
  id: string;
  name: string;
  extension: string;
  icon: string;
  description: string;
  settings: {
    [key: string]: {
      type: string;
      min?: number;
      max?: number;
      default: number | string | boolean;
      options?: string[];
    };
  };
}

// Export formats that exceed Procreate's offerings
const exportFormats: ExportFormat[] = [
  {
    id: 'png',
    name: 'PNG',
    extension: '.png',
    icon: '🖼️',
    description: 'Lossless compression with transparency support',
    settings: {
      resolution: {
        type: 'select',
        default: 'original',
        options: ['original', '1x', '2x', '3x', '4x', 'custom']
      },
      customWidth: {
        type: 'number',
        default: 1920
      },
      customHeight: {
        type: 'number',
        default: 1080
      },
      compression: {
        type: 'slider',
        min: 0,
        max: 9,
        default: 6
      },
      includeMetadata: {
        type: 'toggle',
        default: true
      },
      colorProfile: {
        type: 'select',
        default: 'sRGB',
        options: ['sRGB', 'Display P3', 'Adobe RGB', 'ProPhoto RGB']
      },
      exportLayers: {
        type: 'toggle',
        default: false
      },
      transparencyDither: {
        type: 'toggle',
        default: false
      }
    }
  },
  {
    id: 'jpg',
    name: 'JPEG',
    extension: '.jpg',
    icon: '🖼️',
    description: 'Lossy compression with small file size',
    settings: {
      resolution: {
        type: 'select',
        default: 'original',
        options: ['original', '1x', '2x', '3x', '4x', 'custom']
      },
      customWidth: {
        type: 'number',
        default: 1920
      },
      customHeight: {
        type: 'number',
        default: 1080
      },
      quality: {
        type: 'slider',
        min: 1,
        max: 100,
        default: 90
      },
      progressive: {
        type: 'toggle',
        default: true
      },
      includeMetadata: {
        type: 'toggle',
        default: true
      },
      colorProfile: {
        type: 'select',
        default: 'sRGB',
        options: ['sRGB', 'Display P3', 'Adobe RGB', 'ProPhoto RGB']
      },
      optimizeForWeb: {
        type: 'toggle',
        default: true
      }
    }
  },
  {
    id: 'webp',
    name: 'WebP',
    extension: '.webp',
    icon: '🌐',
    description: 'Modern format with excellent compression and transparency',
    settings: {
      resolution: {
        type: 'select',
        default: 'original',
        options: ['original', '1x', '2x', '3x', '4x', 'custom']
      },
      customWidth: {
        type: 'number',
        default: 1920
      },
      customHeight: {
        type: 'number',
        default: 1080
      },
      quality: {
        type: 'slider',
        min: 1,
        max: 100,
        default: 90
      },
      lossless: {
        type: 'toggle',
        default: false
      },
      animation: {
        type: 'toggle',
        default: false
      },
      animationLoopCount: {
        type: 'number',
        default: 0
      },
      animationFrameRate: {
        type: 'number',
        default: 24
      }
    }
  },
  {
    id: 'svg',
    name: 'SVG',
    extension: '.svg',
    icon: '📐',
    description: 'Vector format for scalable graphics',
    settings: {
      precision: {
        type: 'slider',
        min: 0,
        max: 10,
        default: 2
      },
      minifyOutput: {
        type: 'toggle',
        default: true
      },
      convertTextToPath: {
        type: 'toggle',
        default: false
      },
      embedImages: {
        type: 'toggle',
        default: true
      },
      vectorizeRaster: {
        type: 'toggle',
        default: false
      },
      vectorizationDetail: {
        type: 'slider',
        min: 1,
        max: 10,
        default: 5
      },
      includeMetadata: {
        type: 'toggle',
        default: true
      }
    }
  },
  {
    id: 'psd',
    name: 'PSD',
    extension: '.psd',
    icon: '🎨',
    description: 'Adobe Photoshop format with layer support',
    settings: {
      resolution: {
        type: 'select',
        default: 'original',
        options: ['original', '1x', '2x', '3x', '4x', 'custom']
      },
      customWidth: {
        type: 'number',
        default: 1920
      },
      customHeight: {
        type: 'number',
        default: 1080
      },
      colorProfile: {
        type: 'select',
        default: 'sRGB',
        options: ['sRGB', 'Display P3', 'Adobe RGB', 'ProPhoto RGB']
      },
      bitDepth: {
        type: 'select',
        default: '8',
        options: ['8', '16', '32']
      },
      compression: {
        type: 'select',
        default: 'zip',
        options: ['none', 'rle', 'zip']
      },
      includeAdjustmentLayers: {
        type: 'toggle',
        default: true
      },
      includeSmartObjects: {
        type: 'toggle',
        default: true
      },
      maximizeCompatibility: {
        type: 'toggle',
        default: true
      }
    }
  },
  {
    id: 'tiff',
    name: 'TIFF',
    extension: '.tiff',
    icon: '📷',
    description: 'High-quality format for print and professional use',
    settings: {
      resolution: {
        type: 'select',
        default: 'original',
        options: ['original', '1x', '2x', '3x', '4x', 'custom']
      },
      customWidth: {
        type: 'number',
        default: 1920
      },
      customHeight: {
        type: 'number',
        default: 1080
      },
      compression: {
        type: 'select',
        default: 'lzw',
        options: ['none', 'lzw', 'zip', 'jpeg']
      },
      jpegQuality: {
        type: 'slider',
        min: 1,
        max: 100,
        default: 90
      },
      colorProfile: {
        type: 'select',
        default: 'sRGB',
        options: ['sRGB', 'Display P3', 'Adobe RGB', 'ProPhoto RGB']
      },
      bitDepth: {
        type: 'select',
        default: '8',
        options: ['8', '16', '32']
      },
      includeLayers: {
        type: 'toggle',
        default: false
      },
      includeAlpha: {
        type: 'toggle',
        default: true
      }
    }
  },
  {
    id: 'pdf',
    name: 'PDF',
    extension: '.pdf',
    icon: '📄',
    description: 'Document format with vector and raster support',
    settings: {
      resolution: {
        type: 'select',
        default: 'original',
        options: ['original', '1x', '2x', '3x', '4x', 'custom']
      },
      customWidth: {
        type: 'number',
        default: 1920
      },
      customHeight: {
        type: 'number',
        default: 1080
      },
      compression: {
        type: 'select',
        default: 'medium',
        options: ['none', 'low', 'medium', 'high', 'maximum']
      },
      colorProfile: {
        type: 'select',
        default: 'sRGB',
        options: ['sRGB', 'Display P3', 'Adobe RGB', 'ProPhoto RGB', 'CMYK']
      },
      preserveVectors: {
        type: 'toggle',
        default: true
      },
      includeMetadata: {
        type: 'toggle',
        default: true
      },
      pdfVersion: {
        type: 'select',
        default: '1.7',
        options: ['1.3', '1.4', '1.5', '1.6', '1.7', '2.0']
      },
      password: {
        type: 'text',
        default: ''
      },
      allowPrinting: {
        type: 'toggle',
        default: true
      },
      allowEditing: {
        type: 'toggle',
        default: true
      }
    }
  },
  {
    id: 'gif',
    name: 'GIF',
    extension: '.gif',
    icon: '🎞️',
    description: 'Animated image format with wide support',
    settings: {
      resolution: {
        type: 'select',
        default: 'original',
        options: ['original', '1x', '2x', '3x', '4x', 'custom']
      },
      customWidth: {
        type: 'number',
        default: 1920
      },
      customHeight: {
        type: 'number',
        default: 1080
      },
      colors: {
        type: 'slider',
        min: 2,
        max: 256,
        default: 256
      },
      dithering: {
        type: 'select',
        default: 'floyd-steinberg',
        options: ['none', 'floyd-steinberg', 'atkinson', 'jarvis', 'stucki', 'burkes']
      },
      transparency: {
        type: 'toggle',
        default: true
      },
      animation: {
        type: 'toggle',
        default: false
      },
      frameRate: {
        type: 'slider',
        min: 1,
        max: 60,
        default: 24
      },
      loopCount: {
        type: 'number',
        default: 0
      },
      optimizeFrames: {
        type: 'toggle',
        default: true
      }
    }
  },
  {
    id: 'avif',
    name: 'AVIF',
    extension: '.avif',
    icon: '🌐',
    description: 'Next-gen format with excellent compression',
    settings: {
      resolution: {
        type: 'select',
        default: 'original',
        options: ['original', '1x', '2x', '3x', '4x', 'custom']
      },
      customWidth: {
        type: 'number',
        default: 1920
      },
      customHeight: {
        type: 'number',
        default: 1080
      },
      quality: {
        type: 'slider',
        min: 1,
        max: 100,
        default: 70
      },
      speed: {
        type: 'slider',
        min: 0,
        max: 10,
        default: 5
      },
      animation: {
        type: 'toggle',
        default: false
      },
      frameRate: {
        type: 'slider',
        min: 1,
        max: 60,
        default: 24
      },
      loopCount: {
        type: 'number',
        default: 0
      }
    }
  },
  {
    id: 'gt4',
    name: 'GT4 Project',
    extension: '.gt4',
    icon: '📂',
    description: 'Native GT4 project format with all features preserved',
    settings: {
      compression: {
        type: 'select',
        default: 'medium',
        options: ['none', 'low', 'medium', 'high', 'maximum']
      },
      includeHistory: {
        type: 'toggle',
        default: true
      },
      includeReferences: {
        type: 'toggle',
        default: true
      },
      includePresets: {
        type: 'toggle',
        default: true
      },
      password: {
        type: 'text',
        default: ''
      },
      autoBackup: {
        type: 'toggle',
        default: true
      },
      cloudSync: {
        type: 'toggle',
        default: true
      }
    }
  }
];

export default exportFormats;