import React from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Divider,
  Typography,
  Grid
} from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import CreateIcon from '@mui/icons-material/Create';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PaletteIcon from '@mui/icons-material/Palette';
import CircleIcon from '@mui/icons-material/Circle';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import TimelineIcon from '@mui/icons-material/Timeline';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PanToolIcon from '@mui/icons-material/PanTool';
import CropIcon from '@mui/icons-material/Crop';
import ColorizeIcon from '@mui/icons-material/Colorize';
import { useDrawing } from '../../context/DrawingContext';

interface ToolsPanelProps {}

const ToolsPanel: React.FC<ToolsPanelProps> = () => {
  const { currentTool, setCurrentTool, currentColor, setCurrentColor } = useDrawing();
  const tools = [
    { id: 'brush', icon: <BrushIcon />, tooltip: 'Brush' },
    { id: 'pencil', icon: <CreateIcon />, tooltip: 'Pencil' },
    { id: 'airbrush', icon: <FormatPaintIcon />, tooltip: 'Airbrush' },
    { id: 'eraser', icon: <AutoFixHighIcon />, tooltip: 'Eraser' },
    { id: 'rectangle', icon: <CropSquareIcon />, tooltip: 'Rectangle' },
    { id: 'circle', icon: <CircleIcon />, tooltip: 'Circle' },
    { id: 'line', icon: <TimelineIcon />, tooltip: 'Line' },
    { id: 'triangle', icon: <ChangeHistoryIcon />, tooltip: 'Triangle' },
    { id: 'text', icon: <TextFieldsIcon />, tooltip: 'Text' },
    { id: 'hand', icon: <PanToolIcon />, tooltip: 'Hand Tool' },
    { id: 'crop', icon: <CropIcon />, tooltip: 'Crop' },
    { id: 'eyedropper', icon: <ColorizeIcon />, tooltip: 'Color Picker' }
  ];

  const colorPresets = [
    '#FF5722', // Orange (Primary)
    '#00BCD4', // Cyan (Secondary)
    '#4CAF50', // Green
    '#FFC107', // Amber
    '#9C27B0', // Purple
    '#F44336', // Red
    '#2196F3', // Blue
    '#FFEB3B', // Yellow
    '#000000', // Black
    '#FFFFFF'  // White
  ];

  return (
    <Box
      sx={{
        width: '80px',
        backgroundColor: '#132F4C',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        overflowY: 'auto'
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', textAlign: 'center' }}>
          Tools
        </Typography>
        <Grid container spacing={1} sx={{ px: 1 }}>
          {tools.map((tool) => (
            <Grid item xs={6} key={tool.id}>
              <Tooltip title={tool.tooltip} placement="right">
                <IconButton
                  size="small"
                  color={currentTool === tool.id ? 'primary' : 'default'}
                  onClick={() => setCurrentTool(tool.id)}
                  sx={{
                    backgroundColor: currentTool === tool.id ? 'rgba(255, 87, 34, 0.1)' : 'transparent',
                    borderRadius: '4px',
                    width: '32px',
                    height: '32px'
                  }}
                >
                  {tool.icon}
                </IconButton>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ width: '80%', my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', textAlign: 'center' }}>
          Color
        </Typography>
        <Box
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: currentColor,
            border: '2px solid white',
            mb: 1,
            mx: 'auto',
            cursor: 'pointer'
          }}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'color';
            input.value = currentColor;
            input.addEventListener('input', (e) => {
              setCurrentColor((e.target as HTMLInputElement).value);
            });
            input.click();
          }}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.5, px: 1 }}>
          {colorPresets.map((color) => (
            <Box
              key={color}
              sx={{
                width: '16px',
                height: '16px',
                backgroundColor: color,
                borderRadius: '2px',
                cursor: 'pointer',
                border: color === '#FFFFFF' ? '1px solid rgba(255,255,255,0.3)' : 'none',
                '&:hover': {
                  transform: 'scale(1.2)'
                },
                transition: 'transform 0.2s'
              }}
              onClick={() => setCurrentColor(color)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ToolsPanel;