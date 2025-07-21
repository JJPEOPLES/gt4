import { useEffect } from 'react';
import { useDrawing } from '../context/DrawingContext';

export const useKeyboardShortcuts = () => {
  const { 
    setCurrentTool, 
    history,
    currentColor,
    setCurrentColor,
    brushSize,
    setBrushSize
  } = useDrawing();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the user is typing in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Tool shortcuts
      switch (e.key.toLowerCase()) {
        case 'b':
          setCurrentTool('brush');
          break;
        case 'p':
          setCurrentTool('pencil');
          break;
        case 'e':
          setCurrentTool('eraser');
          break;
        case 'r':
          setCurrentTool('rectangle');
          break;
        case 'c':
          setCurrentTool('circle');
          break;
        case 'l':
          setCurrentTool('line');
          break;
        case 't':
          setCurrentTool('text');
          break;
        case 'h':
          setCurrentTool('hand');
          break;
        case 'i':
          setCurrentTool('eyedropper');
          break;
      }

      // Undo/Redo
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'z':
            if (e.shiftKey) {
              // Ctrl+Shift+Z or Cmd+Shift+Z for Redo
              if (history.canRedo) {
                e.preventDefault();
                history.redo();
              }
            } else {
              // Ctrl+Z or Cmd+Z for Undo
              if (history.canUndo) {
                e.preventDefault();
                history.undo();
              }
            }
            break;
          case 'y':
            // Ctrl+Y or Cmd+Y for Redo
            if (history.canRedo) {
              e.preventDefault();
              history.redo();
            }
            break;
        }
      }

      // Brush size adjustment with [ and ]
      if (e.key === '[') {
        setBrushSize(Math.max(1, brushSize - 5));
      } else if (e.key === ']') {
        setBrushSize(Math.min(100, brushSize + 5));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setCurrentTool, history, brushSize, setBrushSize]);
};

export default useKeyboardShortcuts;