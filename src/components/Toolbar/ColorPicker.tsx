import React, { useState } from 'react';
import { Box, Grid, Typography, Popover, TextField, Slider } from '@mui/material';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [tempColor, setTempColor] = useState(color);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    
    // Convert hex to HSL when opening
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h = Math.round(h * 60);
    }
    
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    setHue(h);
    setSaturation(s);
    setLightness(l);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onChange(tempColor);
  };

  const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    if (/^#[0-9A-F]{6}$/i.test(newColor)) {
      setTempColor(newColor);
    }
  };

  const handleHueChange = (_event: Event, value: number | number[]) => {
    const h = value as number;
    setHue(h);
    updateColorFromHSL(h, saturation, lightness);
  };

  const handleSaturationChange = (_event: Event, value: number | number[]) => {
    const s = value as number;
    setSaturation(s);
    updateColorFromHSL(hue, s, lightness);
  };

  const handleLightnessChange = (_event: Event, value: number | number[]) => {
    const l = value as number;
    setLightness(l);
    updateColorFromHSL(hue, saturation, l);
  };

  const updateColorFromHSL = (h: number, s: number, l: number) => {
    // Convert HSL to hex
    const hslToRgb = (h: number, s: number, l: number) => {
      h /= 360;
      s /= 100;
      l /= 100;
      let r, g, b;

      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }

      const toHex = (x: number) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };

      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const newColor = hslToRgb(h, s, l);
    setTempColor(newColor);
  };

  const presetColors = [
    '#6200EA', // Primary
    '#03DAC6', // Secondary
    '#FF4081', // Pink
    '#FF9100', // Orange
    '#00C853', // Green
    '#2979FF', // Blue
    '#F44336', // Red
    '#FFEB3B', // Yellow
    '#9C27B0', // Purple
    '#795548', // Brown
    '#607D8B', // Blue Grey
    '#000000', // Black
    '#FFFFFF', // White
    '#757575'  // Grey
  ];

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Grid container spacing={1}>
        {presetColors.slice(0, 7).map((presetColor, index) => (
          <Grid item key={index}>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                bgcolor: presetColor,
                cursor: 'pointer',
                border: '2px solid',
                borderColor: color === presetColor ? 'primary.main' : 'transparent',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 0 0 2px rgba(98, 0, 234, 0.3)'
                },
                transition: 'all 0.2s ease'
              }}
              onClick={() => onChange(presetColor)}
            />
          </Grid>
        ))}
        <Grid item>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              bgcolor: color,
              cursor: 'pointer',
              border: '2px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0 0 0 2px rgba(98, 0, 234, 0.3)'
              },
              transition: 'all 0.2s ease'
            }}
            onClick={handleClick}
          >
            <Typography variant="caption" sx={{ fontSize: '18px', fontWeight: 'bold' }}>
              +
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Box
            sx={{
              width: '100%',
              height: 100,
              bgcolor: tempColor,
              mb: 2,
              borderRadius: 1,
              boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)'
            }}
          />
          
          <TextField
            label="Hex Color"
            value={tempColor}
            onChange={handleHexChange}
            fullWidth
            margin="dense"
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />
          
          <Typography gutterBottom>Hue: {hue}°</Typography>
          <Slider
            value={hue}
            onChange={handleHueChange}
            min={0}
            max={360}
            sx={{
              mb: 2,
              background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
              height: 8,
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
                border: '2px solid white',
              }
            }}
          />
          
          <Typography gutterBottom>Saturation: {saturation}%</Typography>
          <Slider
            value={saturation}
            onChange={handleSaturationChange}
            min={0}
            max={100}
            sx={{
              mb: 2,
              background: `linear-gradient(to right, hsl(${hue}, 0%, ${lightness}%), hsl(${hue}, 100%, ${lightness}%))`,
              height: 8,
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
                border: '2px solid white',
              }
            }}
          />
          
          <Typography gutterBottom>Lightness: {lightness}%</Typography>
          <Slider
            value={lightness}
            onChange={handleLightnessChange}
            min={0}
            max={100}
            sx={{
              mb: 2,
              background: `linear-gradient(to right, hsl(${hue}, ${saturation}%, 0%), hsl(${hue}, ${saturation}%, 50%), hsl(${hue}, ${saturation}%, 100%))`,
              height: 8,
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
                border: '2px solid white',
              }
            }}
          />
          
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
            Preset Colors
          </Typography>
          <Grid container spacing={1}>
            {presetColors.map((presetColor, index) => (
              <Grid item key={index}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: presetColor,
                    cursor: 'pointer',
                    border: '2px solid',
                    borderColor: tempColor === presetColor ? 'primary.main' : 'transparent',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => {
                    setTempColor(presetColor);
                    // Also update HSL values
                    const r = parseInt(presetColor.slice(1, 3), 16) / 255;
                    const g = parseInt(presetColor.slice(3, 5), 16) / 255;
                    const b = parseInt(presetColor.slice(5, 7), 16) / 255;
                    
                    const max = Math.max(r, g, b);
                    const min = Math.min(r, g, b);
                    let h = 0, s = 0, l = (max + min) / 2;

                    if (max !== min) {
                      const d = max - min;
                      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                      
                      switch (max) {
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                      }
                      
                      h = Math.round(h * 60);
                    }
                    
                    s = Math.round(s * 100);
                    l = Math.round(l * 100);
                    
                    setHue(h);
                    setSaturation(s);
                    setLightness(l);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Popover>
    </Box>
  );
};

export default ColorPicker;