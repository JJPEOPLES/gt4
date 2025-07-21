import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Stage, Layer, Line, Rect, Circle } from 'react-konva';
import { useDrawing } from '../../context/DrawingContext';

interface CanvasProps {}

const Canvas: React.FC<CanvasProps> = () => {
  const { 
    currentTool, 
    currentColor, 
    brushSize, 
    layers, 
    lines, 
    addLine, 
    updateLine,
    canvasSize,
    setCanvasSize
  } = useDrawing();
  
  const [isDrawing, setIsDrawing] = useState(false);
  const stageRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        setCanvasSize({
          width: Math.min(width - 40, 1200),
          height: Math.min(height - 40, 800)
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, [setCanvasSize]);

  const handleMouseDown = (e: any) => {
    const activeLayer = layers.find(layer => layer.active);
    if (!activeLayer || activeLayer.locked) return;
    
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    
    addLine({ 
      tool: currentTool,
      points: [pos.x, pos.y], 
      color: currentColor,
      size: brushSize,
      layerId: activeLayer.id
    });
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;
    
    const activeLayer = layers.find(layer => layer.active);
    if (!activeLayer || activeLayer.locked) return;
    
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    
    const lastLine = lines[lines.length - 1];
    if (lastLine) {
      // Add point to the last line
      const newPoints = lastLine.points.concat([point.x, point.y]);
      
      // Update the last line
      updateLine(lines.length - 1, newPoints);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <Box 
      ref={containerRef} 
      sx={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        overflow: 'auto'
      }}
    >
      <Stage
        ref={stageRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        style={{ 
          backgroundColor: 'white',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
          borderRadius: '4px'
        }}
      >
        {layers.map(layer => (
          layer.visible && (
            <Layer key={layer.id}>
              {lines
                .filter(line => line.layerId === layer.id)
                .map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={line.size}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={
                      line.tool === 'eraser' ? 'destination-out' : 'source-over'
                    }
                  />
                ))}
            </Layer>
          )
        ))}
      </Stage>
    </Box>
  );
};

export default Canvas;