/**
 * Utility functions for exporting canvas content
 */

/**
 * Exports the canvas as an image file
 * @param stageRef Reference to the Konva Stage
 * @param format Export format ('png', 'jpg', or 'svg')
 * @param fileName Optional filename for the download
 */
export const exportCanvas = (
  stageRef: React.RefObject<any>,
  format: 'png' | 'jpg' | 'svg',
  fileName?: string
): void => {
  if (!stageRef.current) {
    console.error('Stage reference is not available');
    return;
  }

  const stage = stageRef.current;
  let dataURL: string;
  let mimeType: string;
  let extension: string;

  switch (format) {
    case 'jpg':
      // For JPG, we need to set a background color
      dataURL = stage.toDataURL({
        mimeType: 'image/jpeg',
        quality: 0.9,
        pixelRatio: 2,
        backgroundColor: 'white'
      });
      mimeType = 'image/jpeg';
      extension = 'jpg';
      break;
    case 'svg':
      // SVG export is more complex and may require additional libraries
      console.warn('SVG export is not fully implemented yet');
      // This is a placeholder for SVG export
      dataURL = stage.toDataURL({
        mimeType: 'image/svg+xml',
        pixelRatio: 2
      });
      mimeType = 'image/svg+xml';
      extension = 'svg';
      break;
    case 'png':
    default:
      dataURL = stage.toDataURL({
        mimeType: 'image/png',
        pixelRatio: 2
      });
      mimeType = 'image/png';
      extension = 'png';
      break;
  }

  // Create a download link
  const link = document.createElement('a');
  link.download = fileName ? `${fileName}.${extension}` : `gt5-drawing-${Date.now()}.${extension}`;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Saves the current drawing state to local storage
 * @param drawingData The drawing data to save
 * @param name Optional name for the saved drawing
 */
export const saveDrawingToLocalStorage = (
  drawingData: any,
  name?: string
): void => {
  const savedDrawings = JSON.parse(localStorage.getItem('gt5-drawings') || '[]');
  
  const newDrawing = {
    id: Date.now(),
    name: name || `Drawing ${savedDrawings.length + 1}`,
    date: new Date().toISOString(),
    data: drawingData
  };
  
  savedDrawings.push(newDrawing);
  localStorage.setItem('gt5-drawings', JSON.stringify(savedDrawings));
};

/**
 * Loads a drawing from local storage
 * @param id The ID of the drawing to load
 * @returns The drawing data or null if not found
 */
export const loadDrawingFromLocalStorage = (id: number): any | null => {
  const savedDrawings = JSON.parse(localStorage.getItem('gt5-drawings') || '[]');
  const drawing = savedDrawings.find((d: any) => d.id === id);
  return drawing ? drawing.data : null;
};

/**
 * Gets a list of all saved drawings
 * @returns Array of saved drawings with id, name, and date
 */
export const getSavedDrawings = (): Array<{ id: number; name: string; date: string }> => {
  const savedDrawings = JSON.parse(localStorage.getItem('gt5-drawings') || '[]');
  return savedDrawings.map((d: any) => ({
    id: d.id,
    name: d.name,
    date: d.date
  }));
};