import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDrawing } from '../../context/DrawingContext';

interface LayersPanelProps {}

const LayersPanel: React.FC<LayersPanelProps> = () => {
  const { 
    layers, 
    addLayer, 
    toggleLayerVisibility, 
    toggleLayerLock, 
    setActiveLayer, 
    deleteLayer 
  } = useDrawing();
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Layers
        </Typography>
        <Button
          startIcon={<AddIcon />}
          size="small"
          onClick={addLayer}
        >
          Add Layer
        </Button>
      </Box>
      
      <List sx={{ maxHeight: '300px', overflow: 'auto' }}>
        {layers.map((layer) => (
          <ListItem
            key={layer.id}
            className={`layer-item ${layer.active ? 'active' : ''}`}
            onClick={() => setActiveLayer(layer.id)}
            sx={{
              backgroundColor: layer.active ? 'rgba(255, 87, 34, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              borderRadius: '4px',
              mb: 1,
              border: layer.active ? '1px solid #FF5722' : '1px solid transparent'
            }}
          >
            <ListItemText 
              primary={layer.name} 
              sx={{ 
                '& .MuiListItemText-primary': { 
                  fontWeight: layer.active ? 'bold' : 'normal',
                  color: layer.active ? 'primary.main' : 'text.primary'
                } 
              }}
            />
            <Box className="layer-controls">
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLayerVisibility(layer.id);
                }}
              >
                {layer.visible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
              </IconButton>
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLayerLock(layer.id);
                }}
              >
                {layer.locked ? <LockIcon fontSize="small" /> : <LockOpenIcon fontSize="small" />}
              </IconButton>
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteLayer(layer.id);
                }}
                disabled={layers.length <= 1}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Layer Settings
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          Select a layer to adjust its settings. You can change opacity, blending mode, and other properties.
        </Typography>
      </Box>
    </Box>
  );
};

export default LayersPanel;