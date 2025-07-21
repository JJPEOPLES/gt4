import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Layer {
  id: number;
  name: string;
  visible: boolean;
  locked: boolean;
  active: boolean;
}

interface Line {
  tool: string;
  points: number[];
  color: string;
  size: number;
  layerId: number;
}

interface DrawingContextType {
  currentTool: string;
  setCurrentTool: (tool: string) => void;
  currentColor: string;
  setCurrentColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  layers: Layer[];
  addLayer: () => void;
  toggleLayerVisibility: (layerId: number) => void;
  toggleLayerLock: (layerId: number) => void;
  setActiveLayer: (layerId: number) => void;
  deleteLayer: (layerId: number) => void;
  lines: Line[];
  addLine: (line: Line) => void;
  updateLine: (index: number, newPoints: number[]) => void;
  canvasSize: { width: number; height: number };
  setCanvasSize: (size: { width: number; height: number }) => void;
  history: {
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
  };
}

const DrawingContext = createContext<DrawingContextType | undefined>(undefined);

export const useDrawing = () => {
  const context = useContext(DrawingContext);
  if (context === undefined) {
    throw new Error('useDrawing must be used within a DrawingProvider');
  }
  return context;
};

interface DrawingProviderProps {
  children: ReactNode;
}

export const DrawingProvider: React.FC<DrawingProviderProps> = ({ children }) => {
  const [currentTool, setCurrentTool] = useState('brush');
  const [currentColor, setCurrentColor] = useState('#FF5722');
  const [brushSize, setBrushSize] = useState(10);
  const [layers, setLayers] = useState<Layer[]>([
    { id: 1, name: 'Layer 1', visible: true, locked: false, active: true }
  ]);
  const [lines, setLines] = useState<Line[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  
  // History management
  const [history, setHistory] = useState<Line[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const addToHistory = (newLines: Line[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newLines]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
  
  const addLayer = () => {
    const newLayer = {
      id: layers.length + 1,
      name: `Layer ${layers.length + 1}`,
      visible: true,
      locked: false,
      active: false
    };
    
    // Set all layers to inactive
    const updatedLayers = layers.map(layer => ({
      ...layer,
      active: false
    }));
    
    // Add the new layer and set it as active
    setLayers([...updatedLayers, { ...newLayer, active: true }]);
  };
  
  const toggleLayerVisibility = (layerId: number) => {
    setLayers(layers.map(layer => 
      layer.id === layerId 
        ? { ...layer, visible: !layer.visible } 
        : layer
    ));
  };
  
  const toggleLayerLock = (layerId: number) => {
    setLayers(layers.map(layer => 
      layer.id === layerId 
        ? { ...layer, locked: !layer.locked } 
        : layer
    ));
  };
  
  const setActiveLayer = (layerId: number) => {
    setLayers(layers.map(layer => ({
      ...layer,
      active: layer.id === layerId
    })));
  };
  
  const deleteLayer = (layerId: number) => {
    // Don't delete if it's the only layer
    if (layers.length <= 1) return;
    
    // Filter out the layer to delete
    const filteredLayers = layers.filter(layer => layer.id !== layerId);
    
    // If the active layer was deleted, set the last layer as active
    const activeLayerDeleted = layers.find(layer => layer.id === layerId)?.active;
    
    if (activeLayerDeleted) {
      const updatedLayers = filteredLayers.map((layer, index) => ({
        ...layer,
        active: index === filteredLayers.length - 1
      }));
      setLayers(updatedLayers);
    } else {
      setLayers(filteredLayers);
    }
    
    // Remove lines associated with the deleted layer
    const filteredLines = lines.filter(line => line.layerId !== layerId);
    setLines(filteredLines);
    addToHistory(filteredLines);
  };
  
  const addLine = (line: Line) => {
    const newLines = [...lines, line];
    setLines(newLines);
    addToHistory(newLines);
  };
  
  const updateLine = (index: number, newPoints: number[]) => {
    const updatedLines = [...lines];
    if (updatedLines[index]) {
      updatedLines[index].points = newPoints;
      setLines(updatedLines);
    }
  };
  
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setLines(history[historyIndex - 1]);
    }
  };
  
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setLines(history[historyIndex + 1]);
    }
  };
  
  const value = {
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
    lines,
    addLine,
    updateLine,
    canvasSize,
    setCanvasSize,
    history: {
      undo,
      redo,
      canUndo: historyIndex > 0,
      canRedo: historyIndex < history.length - 1
    }
  };
  
  return (
    <DrawingContext.Provider value={value}>
      {children}
    </DrawingContext.Provider>
  );
};

export default DrawingContext;