import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Paper,
  Tooltip,
  Divider
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface Layer {
  id: number;
  name: string;
  visible: boolean;
  locked: boolean;
}

interface LayerPanelProps {
  layers: Layer[];
  currentLayer: number;
  onLayerSelect: (id: number) => void;
  onVisibilityChange: (id: number, visible: boolean) => void;
  onLockChange: (id: number, locked: boolean) => void;
  onLayerDelete: (id: number) => void;
}

const LayerPanel: React.FC<LayerPanelProps> = ({
  layers,
  currentLayer,
  onLayerSelect,
  onVisibilityChange,
  onLockChange,
  onLayerDelete
}) => {
  return (
    <List sx={{ p: 0 }}>
      {layers.map((layer) => (
        <Paper
          key={layer.id}
          elevation={1}
          sx={{
            mb: 1,
            bgcolor: layer.id === currentLayer ? 'rgba(98, 0, 234, 0.1)' : 'background.paper',
            borderRadius: 1,
            border: layer.id === currentLayer ? 1 : 0,
            borderColor: 'primary.main',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: layer.id === currentLayer ? 'rgba(98, 0, 234, 0.15)' : 'rgba(255, 255, 255, 0.05)'
            }
          }}
        >
          <ListItem
            button
            onClick={() => onLayerSelect(layer.id)}
            sx={{ px: 1, py: 0.5 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                opacity: layer.visible ? 1 : 0.5
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mr: 1,
                  color: 'text.secondary'
                }}
              >
                <DragIndicatorIcon fontSize="small" />
              </Box>
              
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  mr: 1,
                  bgcolor: 'background.default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: 'text.secondary'
                }}
              >
                {layer.id}
              </Box>
              
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: layer.id === currentLayer ? 600 : 400,
                      color: layer.id === currentLayer ? 'primary.main' : 'text.primary'
                    }}
                  >
                    {layer.name}
                  </Typography>
                }
              />
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title={layer.visible ? "Hide Layer" : "Show Layer"}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onVisibilityChange(layer.id, !layer.visible);
                    }}
                    sx={{ color: layer.visible ? 'primary.main' : 'text.secondary' }}
                  >
                    {layer.visible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
                
                <Tooltip title={layer.locked ? "Unlock Layer" : "Lock Layer"}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLockChange(layer.id, !layer.locked);
                    }}
                    sx={{ color: layer.locked ? 'error.main' : 'text.secondary' }}
                  >
                    {layer.locked ? <LockIcon fontSize="small" /> : <LockOpenIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Delete Layer">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLayerDelete(layer.id);
                    }}
                    sx={{ 
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'error.main'
                      }
                    }}
                    disabled={layers.length <= 1}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </ListItem>
        </Paper>
      ))}
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ p: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Tip: Select a layer to edit it. Use the visibility and lock icons to control layer behavior.
        </Typography>
      </Box>
    </List>
  );
};

export default LayerPanel;