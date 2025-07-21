import React from 'react';
import { Box, Typography, Slider, Stack } from '@mui/material';

interface BrushSettingsProps {
  size: number;
  opacity: number;
  onSizeChange: (event: Event, value: number | number[]) => void;
  onOpacityChange: (event: Event, value: number | number[]) => void;
}

const BrushSettings: React.FC<BrushSettingsProps> = ({
  size,
  opacity,
  onSizeChange,
  onOpacityChange
}) => {
  return (
    <Box>
      <Stack spacing={2}>
        <Box>
          <Typography gutterBottom variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Size</span>
            <span>{size}px</span>
          </Typography>
          <Slider
            value={size}
            onChange={onSizeChange}
            min={1}
            max={100}
            aria-label="Brush Size"
            sx={{
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
              }
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: 'primary.main'
              }}
            />
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                bgcolor: 'primary.main'
              }}
            />
          </Box>
        </Box>
        
        <Box>
          <Typography gutterBottom variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Opacity</span>
            <span>{opacity}%</span>
          </Typography>
          <Slider
            value={opacity}
            onChange={onOpacityChange}
            min={1}
            max={100}
            aria-label="Brush Opacity"
            sx={{
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
              }
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                opacity: 0.2
              }}
            />
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                opacity: 1
              }}
            />
          </Box>
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Tip: Use a larger brush size for broad strokes and a smaller size for details.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default BrushSettings;