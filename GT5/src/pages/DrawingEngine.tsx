import React, { useState, useEffect } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Divider,
  Tabs,
  Tab,
  useTheme,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Canvas from '../components/DrawingEngine/Canvas';
import ToolsPanel from '../components/DrawingEngine/ToolsPanel';
import PropertiesPanel from '../components/DrawingEngine/PropertiesPanel';
import LayersPanel from '../components/DrawingEngine/LayersPanel';
import { useDrawing } from '../context/DrawingContext';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import '../styles/DrawingEngine.css';

const DrawingEngine: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [shortcutsDialogOpen, setShortcutsDialogOpen] = useState(false);
  const [exportMenuAnchor, setExportMenuAnchor] = useState<null | HTMLElement>(null);
  
  const { 
    currentTool, 
    setCurrentTool, 
    currentColor, 
    setCurrentColor, 
    brushSize, 
    setBrushSize,
    layers,
    addLayer,
    toggleLayerVisibility,
    toggleLayerLock,
    setActiveLayer,
    deleteLayer,
    history,
    canvasSize,
    setCanvasSize
  } = useDrawing();
  
  // Use keyboard shortcuts
  useKeyboardShortcuts();
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleExportMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setExportMenuAnchor(event.currentTarget);
  };
  
  const handleExportMenuClose = () => {
    setExportMenuAnchor(null);
  };
  
  const exportAs = (format: string) => {
    // Implementation for exporting canvas
    console.log(`Exporting as ${format}`);
    handleExportMenuClose();
  };

  return (
    <Box className="drawing-engine">
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <IconButton 
            color="primary"
            aria-label="back to GT4"
            onClick={() => window.location.href = '/'}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: 'primary.main' }}>
            GT5 Drawing Engine
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              color="inherit" 
              aria-label="undo" 
              onClick={history.undo}
              disabled={!history.canUndo}
            >
              <UndoIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              aria-label="redo"
              onClick={history.redo}
              disabled={!history.canRedo}
            >
              <RedoIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, height: '24px' }} />
            <IconButton color="inherit" aria-label="save">
              <SaveIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              aria-label="download"
              onClick={handleExportMenuOpen}
            >
              <DownloadIcon />
            </IconButton>
            <Menu
              anchorEl={exportMenuAnchor}
              open={Boolean(exportMenuAnchor)}
              onClose={handleExportMenuClose}
            >
              <MenuItem onClick={() => exportAs('png')}>PNG</MenuItem>
              <MenuItem onClick={() => exportAs('jpg')}>JPG</MenuItem>
              <MenuItem onClick={() => exportAs('svg')}>SVG</MenuItem>
            </Menu>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, height: '24px' }} />
            <IconButton 
              color="inherit" 
              aria-label="keyboard shortcuts"
              onClick={() => setShortcutsDialogOpen(true)}
            >
              <KeyboardIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="settings">
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box className="drawing-container">
        <ToolsPanel />
        
        <Box className="canvas-area">
          <Canvas />
        </Box>
        
        <Box className="right-panel">
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            aria-label="right panel tabs"
            orientation="horizontal"
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Properties" />
            <Tab label="Layers" />
          </Tabs>
          
          <Box sx={{ p: 2 }}>
            {tabValue === 0 && (
              <PropertiesPanel />
            )}
            
            {tabValue === 1 && (
              <LayersPanel />
            )}
          </Box>
        </Box>
      </Box>
      
      {/* Keyboard Shortcuts Dialog */}
      <Dialog 
        open={shortcutsDialogOpen} 
        onClose={() => setShortcutsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Keyboard Shortcuts</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Tools</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 1 }}>
              <Typography variant="body2">B</Typography>
              <Typography variant="body2">Brush Tool</Typography>
              
              <Typography variant="body2">P</Typography>
              <Typography variant="body2">Pencil Tool</Typography>
              
              <Typography variant="body2">E</Typography>
              <Typography variant="body2">Eraser Tool</Typography>
              
              <Typography variant="body2">R</Typography>
              <Typography variant="body2">Rectangle Tool</Typography>
              
              <Typography variant="body2">C</Typography>
              <Typography variant="body2">Circle Tool</Typography>
              
              <Typography variant="body2">L</Typography>
              <Typography variant="body2">Line Tool</Typography>
              
              <Typography variant="body2">T</Typography>
              <Typography variant="body2">Text Tool</Typography>
              
              <Typography variant="body2">H</Typography>
              <Typography variant="body2">Hand Tool</Typography>
              
              <Typography variant="body2">I</Typography>
              <Typography variant="body2">Eyedropper Tool</Typography>
            </Box>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Actions</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 1 }}>
              <Typography variant="body2">Ctrl+Z</Typography>
              <Typography variant="body2">Undo</Typography>
              
              <Typography variant="body2">Ctrl+Y</Typography>
              <Typography variant="body2">Redo</Typography>
              
              <Typography variant="body2">Ctrl+Shift+Z</Typography>
              <Typography variant="body2">Redo</Typography>
              
              <Typography variant="body2">[</Typography>
              <Typography variant="body2">Decrease Brush Size</Typography>
              
              <Typography variant="body2">]</Typography>
              <Typography variant="body2">Increase Brush Size</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShortcutsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DrawingEngine;