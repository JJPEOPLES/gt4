import React from 'react';
import {
  Box,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider
} from '@mui/material';
import { useDrawing } from '../../context/DrawingContext';

interface PropertiesPanelProps {}

const PropertiesPanel: React.FC<PropertiesPanelProps> = () => {
  const { currentTool, brushSize, setBrushSize } = useDrawing();
  
  const handleBrushSizeChange = (event: Event, newValue: number | number[]) => {
    setBrushSize(newValue as number);
  };
  const renderToolProperties = () => {
    switch (currentTool) {
      case 'brush':
      case 'pencil':
      case 'airbrush':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Brush Properties
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography id="brush-size-slider" gutterBottom variant="caption">
                Size: {brushSize}px
              </Typography>
              <Slider
                value={brushSize}
                onChange={handleBrushSizeChange}
                aria-labelledby="brush-size-slider"
                min={1}
                max={100}
                valueLabelDisplay="auto"
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography id="brush-opacity-slider" gutterBottom variant="caption">
                Opacity: 100%
              </Typography>
              <Slider
                defaultValue={100}
                aria-labelledby="brush-opacity-slider"
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography id="brush-hardness-slider" gutterBottom variant="caption">
                Hardness: 50%
              </Typography>
              <Slider
                defaultValue={50}
                aria-labelledby="brush-hardness-slider"
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="brush-type-label">Brush Type</InputLabel>
                <Select
                  labelId="brush-type-label"
                  id="brush-type"
                  value="round"
                  label="Brush Type"
                >
                  <MenuItem value="round">Round</MenuItem>
                  <MenuItem value="square">Square</MenuItem>
                  <MenuItem value="textured">Textured</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        );
        
      case 'eraser':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Eraser Properties
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography id="eraser-size-slider" gutterBottom variant="caption">
                Size: {brushSize}px
              </Typography>
              <Slider
                value={brushSize}
                onChange={handleBrushSizeChange}
                aria-labelledby="eraser-size-slider"
                min={1}
                max={100}
                valueLabelDisplay="auto"
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography id="eraser-hardness-slider" gutterBottom variant="caption">
                Hardness: 100%
              </Typography>
              <Slider
                defaultValue={100}
                aria-labelledby="eraser-hardness-slider"
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
            </Box>
          </Box>
        );
        
      case 'rectangle':
      case 'circle':
      case 'triangle':
      case 'line':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Shape Properties
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography id="shape-stroke-slider" gutterBottom variant="caption">
                Stroke Width: {brushSize}px
              </Typography>
              <Slider
                value={brushSize}
                onChange={handleBrushSizeChange}
                aria-labelledby="shape-stroke-slider"
                min={1}
                max={50}
                valueLabelDisplay="auto"
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="fill-type-label">Fill Type</InputLabel>
                <Select
                  labelId="fill-type-label"
                  id="fill-type"
                  value="outline"
                  label="Fill Type"
                >
                  <MenuItem value="outline">Outline</MenuItem>
                  <MenuItem value="filled">Filled</MenuItem>
                  <MenuItem value="both">Both</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        );
        
      case 'text':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Text Properties
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Font Size"
                type="number"
                defaultValue={24}
                size="small"
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="font-family-label">Font Family</InputLabel>
                <Select
                  labelId="font-family-label"
                  id="font-family"
                  value="Arial"
                  label="Font Family"
                >
                  <MenuItem value="Arial">Arial</MenuItem>
                  <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                  <MenuItem value="Courier New">Courier New</MenuItem>
                  <MenuItem value="Georgia">Georgia</MenuItem>
                  <MenuItem value="Verdana">Verdana</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="font-weight-label">Font Weight</InputLabel>
                <Select
                  labelId="font-weight-label"
                  id="font-weight"
                  value="normal"
                  label="Font Weight"
                >
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="bold">Bold</MenuItem>
                  <MenuItem value="lighter">Lighter</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        );
        
      default:
        return (
          <Box>
            <Typography variant="body2" color="text.secondary">
              Select a tool to see its properties
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Properties
      </Typography>
      
      {renderToolProperties()}
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle2" gutterBottom>
        Canvas Settings
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Width"
          type="number"
          defaultValue={800}
          size="small"
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          label="Height"
          type="number"
          defaultValue={600}
          size="small"
        />
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="background-label">Background</InputLabel>
          <Select
            labelId="background-label"
            id="background"
            value="white"
            label="Background"
          >
            <MenuItem value="white">White</MenuItem>
            <MenuItem value="transparent">Transparent</MenuItem>
            <MenuItem value="custom">Custom Color</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default PropertiesPanel;