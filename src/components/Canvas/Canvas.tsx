import React, { forwardRef, useRef, useEffect, useImperativeHandle, useState } from 'react';
import { Box } from '@mui/material';
// Import fabric.js without type checking to avoid TypeScript errors
const fabric = require('fabric').fabric;

interface CanvasProps {
  width: number;
  height: number;
  tool: string;
  brushSize: number;
  brushOpacity: number;
  brushColor: string;
  currentLayer: number;
  layers: Array<{
    id: number;
    name: string;
    visible: boolean;
    locked: boolean;
  }>;
}

interface HistoryItem {
  objects: any[]; // Using any[] to avoid type issues with fabric.Object
  backgroundImage: any | null; // Using any to avoid type issues with fabric.Image
}

const Canvas = forwardRef<any, CanvasProps>((props, ref) => {
  const { width, height, tool, brushSize, brushOpacity, brushColor, currentLayer, layers } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<any | null>(null); // Using any to avoid type issues with fabric.Canvas
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize the canvas
  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width,
        height,
        backgroundColor: '#ffffff',
        isDrawingMode: true,
        selection: true,
        preserveObjectStacking: true
      });

      // Set up the brush
      const brush = new fabric.PencilBrush(canvas);
      brush.width = brushSize;
      brush.color = brushColor;
      brush.opacity = brushOpacity;
      canvas.freeDrawingBrush = brush;

      // Add event listeners
      canvas.on('path:created', (e: any) => {
        console.log('Path created', e);
        // Make sure the path is selectable
        if (e.path) {
          e.path.selectable = true;
          e.path.evented = true;
        }
        addToHistory();
      });

      canvas.on('object:added', (e: any) => {
        console.log('Object added', e);
        if (!isDrawing) {
          addToHistory();
        }
      });

      canvas.on('object:modified', (e: any) => {
        console.log('Object modified', e);
        addToHistory();
      });

      canvas.on('mouse:down', () => {
        console.log('Mouse down');
        setIsDrawing(true);
      });

      canvas.on('mouse:up', () => {
        console.log('Mouse up');
        setIsDrawing(false);
        // Ensure we add to history after drawing is complete
        setTimeout(() => {
          addToHistory();
        }, 50);
      });

      fabricCanvasRef.current = canvas;
      
      // Initialize history
      addToHistory();
    }

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update canvas size when dimensions change
  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.setWidth(width);
      fabricCanvasRef.current.setHeight(height);
      fabricCanvasRef.current.renderAll();
    }
  }, [width, height]);

  // Update brush properties when they change
  useEffect(() => {
    if (fabricCanvasRef.current) {
      const brush = fabricCanvasRef.current.freeDrawingBrush;
      
      // Only update brush properties if not in eraser mode
      if (tool !== 'eraser') {
        brush.width = brushSize;
        brush.color = brushColor;
        brush.opacity = brushOpacity;
        console.log('Updated brush properties:', brushSize, brushColor, brushOpacity);
      }
    }
  }, [brushSize, brushColor, brushOpacity, tool]);

  // Update drawing mode based on selected tool
  useEffect(() => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      
      console.log('Tool changed to:', tool);
      
      // Reset selection
      canvas.discardActiveObject();
      canvas.renderAll();
      
      switch (tool) {
        case 'brush':
          canvas.isDrawingMode = true;
          canvas.freeDrawingBrush.width = brushSize;
          canvas.freeDrawingBrush.color = brushColor;
          canvas.freeDrawingBrush.opacity = brushOpacity;
          console.log('Brush mode activated with:', brushSize, brushColor, brushOpacity);
          break;
        case 'eraser':
          canvas.isDrawingMode = true;
          canvas.freeDrawingBrush.width = brushSize * 1.5; // Slightly larger for eraser
          canvas.freeDrawingBrush.color = '#ffffff'; // White color for eraser
          canvas.freeDrawingBrush.opacity = 1; // Full opacity for eraser
          console.log('Eraser mode activated');
          break;
        case 'shape':
          canvas.isDrawingMode = false;
          console.log('Shape mode activated');
          break;
        case 'text':
          canvas.isDrawingMode = false;
          console.log('Text mode activated');
          break;
        case 'fill':
          canvas.isDrawingMode = false;
          console.log('Fill mode activated');
          break;
        default:
          canvas.isDrawingMode = true;
          console.log('Default drawing mode activated');
          break;
      }
    }
  }, [tool, brushSize, brushColor, brushOpacity]);

  // Handle layer visibility changes
  useEffect(() => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      const objects = canvas.getObjects();
      
      // In a real implementation, objects would be assigned to layers
      // This is a simplified version
      objects.forEach((obj: any, index) => {
        const layerIndex = index % layers.length;
        const layer = layers[layerIndex];
        if (layer) {
          obj.visible = layer.visible;
          obj.selectable = !layer.locked;
          obj.evented = !layer.locked;
        }
      });
      
      canvas.renderAll();
    }
  }, [layers]);

  // Add current canvas state to history
  const addToHistory = () => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      
      // Get all objects on the canvas
      const allObjects = canvas.getObjects();
      console.log('Objects on canvas:', allObjects.length);
      
      if (allObjects.length === 0 && history.length > 0) {
        console.log('No objects to add to history');
        return;
      }
      
      // Convert objects to JSON for storage
      const objects = allObjects.map((obj: any) => {
        // Ensure all properties are captured
        return obj.toJSON(['id', 'name', 'visible', 'locked', 'selectable', 'evented']);
      });
      
      const backgroundImage = canvas.backgroundImage as fabric.Image | null;
      
      // Remove future history if we're not at the end
      const newHistory = history.slice(0, historyIndex + 1);
      
      // Add current state to history
      newHistory.push({ 
        objects: objects, 
        backgroundImage 
      });
      
      // Limit history size to prevent memory issues
      if (newHistory.length > 50) {
        newHistory.shift();
      }
      
      // Update state
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      console.log('Added to history. History length:', newHistory.length, 'Current index:', newHistory.length - 1);
    }
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    setTool: (newTool: string) => {
      if (fabricCanvasRef.current) {
        const canvas = fabricCanvasRef.current;
        
        switch (newTool) {
          case 'brush':
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.width = brushSize;
            canvas.freeDrawingBrush.color = brushColor;
            canvas.freeDrawingBrush.opacity = brushOpacity;
            break;
          case 'eraser':
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.width = brushSize;
            canvas.freeDrawingBrush.color = '#ffffff'; // White color for eraser
            canvas.freeDrawingBrush.opacity = 1; // Full opacity for eraser
            break;
          case 'shape':
            canvas.isDrawingMode = false;
            // Add a rectangle on click
            const addRect = () => {
              const rect = new fabric.Rect({
                left: canvas.width! / 2 - 50,
                top: canvas.height! / 2 - 50,
                fill: brushColor,
                width: 100,
                height: 100,
                opacity: brushOpacity,
              });
              canvas.add(rect);
              canvas.setActiveObject(rect);
              canvas.renderAll();
              addToHistory();
            };
            addRect();
            break;
          case 'text':
            canvas.isDrawingMode = false;
            // Add text on click
            const addText = () => {
              const text = new fabric.IText('Edit this text', {
                left: canvas.width! / 2 - 100,
                top: canvas.height! / 2 - 20,
                fontFamily: 'Arial',
                fill: brushColor,
                fontSize: brushSize * 2,
                opacity: brushOpacity,
              });
              canvas.add(text);
              canvas.setActiveObject(text);
              canvas.renderAll();
              addToHistory();
            };
            addText();
            break;
          default:
            canvas.isDrawingMode = true;
            break;
        }
      }
    },
    setBrushSize: (size: number) => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.freeDrawingBrush.width = size;
      }
    },
    setBrushColor: (color: string) => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.freeDrawingBrush.color = color;
      }
    },
    setBrushOpacity: (opacity: number) => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.freeDrawingBrush.opacity = opacity;
      }
    },
    undo: () => {
      console.log('Undo called. Current index:', historyIndex, 'History length:', history.length);
      if (historyIndex > 0 && fabricCanvasRef.current) {
        const canvas = fabricCanvasRef.current;
        const newIndex = historyIndex - 1;
        const historyItem = history[newIndex];
        
        console.log('Undoing to index:', newIndex);
        
        // Clear the canvas
        canvas.clear();
        
        // Set background if it exists
        if (historyItem.backgroundImage) {
          canvas.setBackgroundImage(historyItem.backgroundImage, canvas.renderAll.bind(canvas));
        }
        
        // Load all objects from history
        if (historyItem.objects && historyItem.objects.length > 0) {
          console.log('Restoring', historyItem.objects.length, 'objects');
          
          // Use loadFromJSON for more reliable object restoration
          canvas.loadFromJSON({ objects: historyItem.objects }, function() {
            canvas.renderAll();
            console.log('Canvas restored from history');
          });
        } else {
          canvas.renderAll();
        }
        
        setHistoryIndex(newIndex);
      } else {
        console.log('Cannot undo: at beginning of history or no canvas');
      }
    },
    redo: () => {
      console.log('Redo called. Current index:', historyIndex, 'History length:', history.length);
      if (historyIndex < history.length - 1 && fabricCanvasRef.current) {
        const canvas = fabricCanvasRef.current;
        const newIndex = historyIndex + 1;
        const historyItem = history[newIndex];
        
        console.log('Redoing to index:', newIndex);
        
        // Clear the canvas
        canvas.clear();
        
        // Set background if it exists
        if (historyItem.backgroundImage) {
          canvas.setBackgroundImage(historyItem.backgroundImage, canvas.renderAll.bind(canvas));
        }
        
        // Load all objects from history
        if (historyItem.objects && historyItem.objects.length > 0) {
          console.log('Restoring', historyItem.objects.length, 'objects');
          
          // Use loadFromJSON for more reliable object restoration
          canvas.loadFromJSON({ objects: historyItem.objects }, function() {
            canvas.renderAll();
            console.log('Canvas restored from history');
          });
        } else {
          canvas.renderAll();
        }
        
        setHistoryIndex(newIndex);
      } else {
        console.log('Cannot redo: at end of history or no canvas');
      }
    },
    clearCanvas: () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.clear();
        fabricCanvasRef.current.setBackgroundColor('#ffffff', () => {});
        fabricCanvasRef.current.renderAll();
        addToHistory();
      }
    },
    saveImage: () => {
      if (fabricCanvasRef.current) {
        const dataURL = fabricCanvasRef.current.toDataURL({
          format: 'png',
          quality: 1
        });
        
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'gt4-artwork.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    resizeCanvas: (newWidth: number, newHeight: number) => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.setWidth(newWidth);
        fabricCanvasRef.current.setHeight(newHeight);
        fabricCanvasRef.current.renderAll();
      }
    }
  }));

  return (
    <Box className="canvas-wrapper">
      <canvas ref={canvasRef} />
    </Box>
  );
});

export default Canvas;