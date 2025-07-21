import React, { useState, useRef } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Drawer, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Paper,
  useTheme,
  Grid
} from '@mui/material';
import { useAuth } from '../components/Auth/AuthContext';
import CollabPanel from '../components/Collaboration/CollabPanel';
import LiveUserCount from '../components/LiveUserCount';
import MenuIcon from '@mui/icons-material/Menu';
import BrushIcon from '@mui/icons-material/Brush';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import LayersIcon from '@mui/icons-material/Layers';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import PaletteIcon from '@mui/icons-material/Palette';
import ImageIcon from '@mui/icons-material/Image';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ShapeLineIcon from '@mui/icons-material/ShowChart';
import CropIcon from '@mui/icons-material/Crop';
import TuneIcon from '@mui/icons-material/Tune';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import Canvas from '../components/Canvas/Canvas';
import ColorPicker from '../components/Toolbar/ColorPicker';
import BrushSettings from '../components/Toolbar/BrushSettings';
import LayerPanel from '../components/Canvas/LayerPanel';
import '../styles/DrawingApp.css';

const drawerWidth = 280;

const DrawingApp: React.FC = () => {
  const theme = useTheme();
  const canvasRef = useRef<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [currentTool, setCurrentTool] = useState('brush');
  const [brushSize, setBrushSize] = useState(10);
  const [brushOpacity, setBrushOpacity] = useState(100);
  const [brushColor, setBrushColor] = useState('#6200EA');
  const [layers, setLayers] = useState([{ id: 1, name: 'Layer 1', visible: true, locked: false }]);
  const [currentLayer, setCurrentLayer] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showCollabPanel, setShowCollabPanel] = useState(false);
  const { currentUser, isCreator } = useAuth();
  const [canvasWidth, setCanvasWidth] = useState(1920);
  const [canvasHeight, setCanvasHeight] = useState(1080);
  const [zoom, setZoom] = useState(100);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleRightPanelToggle = () => {
    setRightPanelOpen(!rightPanelOpen);
  };

  const handleToolChange = (tool: string) => {
    setCurrentTool(tool);
    if (canvasRef.current) {
      canvasRef.current.setTool(tool);
    }
  };

  const handleBrushSizeChange = (event: Event, newValue: number | number[]) => {
    const size = newValue as number;
    setBrushSize(size);
    if (canvasRef.current) {
      canvasRef.current.setBrushSize(size);
    }
  };

  const handleBrushOpacityChange = (event: Event, newValue: number | number[]) => {
    const opacity = newValue as number;
    setBrushOpacity(opacity);
    if (canvasRef.current) {
      canvasRef.current.setBrushOpacity(opacity / 100);
    }
  };

  const handleColorChange = (color: string) => {
    setBrushColor(color);
    if (canvasRef.current) {
      canvasRef.current.setBrushColor(color);
    }
  };

  const handleAddLayer = () => {
    const newLayerId = layers.length + 1;
    const newLayer = {
      id: newLayerId,
      name: `Layer ${newLayerId}`,
      visible: true,
      locked: false
    };
    setLayers([...layers, newLayer]);
    setCurrentLayer(newLayerId);
  };

  const handleLayerVisibilityChange = (layerId: number, visible: boolean) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, visible } : layer
    ));
  };

  const handleLayerLockChange = (layerId: number, locked: boolean) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, locked } : layer
    ));
  };

  const handleLayerDelete = (layerId: number) => {
    if (layers.length > 1) {
      const newLayers = layers.filter(layer => layer.id !== layerId);
      setLayers(newLayers);
      if (currentLayer === layerId) {
        setCurrentLayer(newLayers[0].id);
      }
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
    handleMenuClose();
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const handleCanvasSizeChange = () => {
    if (canvasRef.current) {
      canvasRef.current.resizeCanvas(canvasWidth, canvasHeight);
    }
    handleSettingsClose();
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 10));
  };

  const handleSaveImage = () => {
    if (canvasRef.current) {
      canvasRef.current.saveImage();
    }
  };

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  };

  const handleUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const handleRedo = () => {
    if (canvasRef.current) {
      canvasRef.current.redo();
    }
  };

  const toolbarItems = [
    { name: 'Brush', icon: <BrushIcon />, tool: 'brush' },
    { name: 'Eraser', icon: <DeleteIcon fontSize="small" />, tool: 'eraser' },
    { name: 'Fill', icon: <FormatColorFillIcon />, tool: 'fill' },
    { name: 'Shape', icon: <ShapeLineIcon />, tool: 'shape' },
    { name: 'Text', icon: <TextFieldsIcon />, tool: 'text' },
    { name: 'Crop', icon: <CropIcon />, tool: 'crop' },
    { name: 'Image', icon: <ImageIcon />, tool: 'image' },
    { name: 'Adjust', icon: <TuneIcon />, tool: 'adjust' }
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
          GT4 Tools
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {toolbarItems.map((item) => (
          <ListItem 
            button 
            key={item.name}
            selected={currentTool === item.tool}
            onClick={() => handleToolChange(item.tool)}
            sx={{
              my: 0.5,
              borderRadius: 1,
              mx: 1,
              '&.Mui-selected': {
                bgcolor: 'primary.dark',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: currentTool === item.tool ? 'white' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.name} 
              sx={{ 
                '& .MuiTypography-root': { 
                  color: currentTool === item.tool ? 'white' : 'inherit',
                  fontWeight: currentTool === item.tool ? 600 : 400
                } 
              }} 
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
          Brush Settings
        </Typography>
        <BrushSettings 
          size={brushSize} 
          opacity={brushOpacity} 
          onSizeChange={handleBrushSizeChange} 
          onOpacityChange={handleBrushOpacityChange} 
        />
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
          Color
        </Typography>
        <ColorPicker color={brushColor} onChange={handleColorChange} />
      </Box>
    </div>
  );

  const rightPanel = (
    <Box sx={{ width: drawerWidth, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Layers
        </Typography>
        <IconButton size="small" onClick={handleAddLayer} color="primary">
          <Typography variant="body2" sx={{ mr: 0.5 }}>Add</Typography>
          <LayersIcon fontSize="small" />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <LayerPanel 
        layers={layers}
        currentLayer={currentLayer}
        onLayerSelect={setCurrentLayer}
        onVisibilityChange={handleLayerVisibilityChange}
        onLockChange={handleLayerLockChange}
        onLayerDelete={handleLayerDelete}
      />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
            GT4 Drawing Engine
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={1}>
            <Tooltip title="Undo">
              <IconButton color="inherit" onClick={handleUndo}>
                <UndoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Redo">
              <IconButton color="inherit" onClick={handleRedo}>
                <RedoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zoom Out">
              <IconButton color="inherit" onClick={handleZoomOut}>
                <ZoomOutIcon />
              </IconButton>
            </Tooltip>
            
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            
            <Tooltip title={showCollabPanel ? "Hide Collaboration" : "Show Collaboration"}>
              <IconButton 
                color={showCollabPanel ? "primary" : "inherit"} 
                onClick={() => setShowCollabPanel(!showCollabPanel)}
                disabled={!currentUser}
              >
                <GroupIcon />
              </IconButton>
            </Tooltip>
            
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
              <LiveUserCount />
            </Box>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              {zoom}%
            </Typography>
            <Tooltip title="Zoom In">
              <IconButton color="inherit" onClick={handleZoomIn}>
                <ZoomInIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <Tooltip title="Save">
              <IconButton color="inherit" onClick={handleSaveImage}>
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Clear Canvas">
              <IconButton color="inherit" onClick={handleClearCanvas}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton 
                color="inherit" 
                onClick={handleMenuOpen}
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
          bgcolor: 'background.default'
        }}
      >
        <Toolbar />
        <Box 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            overflow: 'auto',
            position: 'relative'
          }}
        >
          <Paper 
            elevation={4} 
            sx={{ 
              transform: `scale(${zoom / 100})`,
              transition: 'transform 0.2s ease',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}
          >
            <Canvas 
              ref={canvasRef}
              width={canvasWidth} 
              height={canvasHeight}
              tool={currentTool}
              brushSize={brushSize}
              brushOpacity={brushOpacity / 100}
              brushColor={brushColor}
              currentLayer={currentLayer}
              layers={layers}
            />
          </Paper>
        </Box>
      </Box>
      
      <Drawer
        variant="persistent"
        anchor="right"
        open={rightPanelOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            position: 'relative',
            border: 'none',
            borderLeft: 1,
            borderColor: 'divider'
          },
        }}
      >
        {rightPanel}
      </Drawer>
      
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleSettingsOpen}>
          <ListItemIcon>
            <TuneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Canvas Settings</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleSaveImage}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export Image</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleRightPanelToggle}>
          <ListItemIcon>
            <LayersIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{rightPanelOpen ? 'Hide Layers Panel' : 'Show Layers Panel'}</ListItemText>
        </MenuItem>
      </Menu>
      
      <Dialog open={settingsOpen} onClose={handleSettingsClose}>
        <DialogTitle>Canvas Settings</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1, minWidth: '300px' }}>
            <TextField
              label="Width (px)"
              type="number"
              value={canvasWidth}
              onChange={(e) => setCanvasWidth(Number(e.target.value))}
              fullWidth
            />
            <TextField
              label="Height (px)"
              type="number"
              value={canvasHeight}
              onChange={(e) => setCanvasHeight(Number(e.target.value))}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Preset Sizes</InputLabel>
              <Select
                label="Preset Sizes"
                value=""
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '1080p') {
                    setCanvasWidth(1920);
                    setCanvasHeight(1080);
                  } else if (value === '4k') {
                    setCanvasWidth(3840);
                    setCanvasHeight(2160);
                  } else if (value === 'instagram') {
                    setCanvasWidth(1080);
                    setCanvasHeight(1080);
                  } else if (value === 'a4') {
                    setCanvasWidth(2480);
                    setCanvasHeight(3508);
                  }
                }}
              >
                <MenuItem value="1080p">1080p (1920×1080)</MenuItem>
                <MenuItem value="4k">4K (3840×2160)</MenuItem>
                <MenuItem value="instagram">Instagram (1080×1080)</MenuItem>
                <MenuItem value="a4">A4 Print (2480×3508)</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSettingsClose}>Cancel</Button>
          <Button onClick={handleCanvasSizeChange} variant="contained" color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DrawingApp;