import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const Workspace = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      requestAnimationFrame(() => {
        fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
          width: window.innerWidth / 2,
          height: window.innerHeight,
          backgroundColor: '#f0f0f0',
          preserveObjectStacking: true,
          enableRetinaScaling: true,
          renderOnAddRemove: true,
          selection: true,
          interactive: true
        });
        setIsCanvasReady(true);
      });

      let resizeTimeout;
      const handleResize = () => {
        if (!fabricCanvasRef.current) return;
        
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const width = window.innerWidth / 2;
          const height = window.innerHeight;
          
          fabricCanvasRef.current.setDimensions({ width, height });
          fabricCanvasRef.current.setZoom(fabricCanvasRef.current.getZoom());
          fabricCanvasRef.current.renderAll();
        }, 250);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
        if (fabricCanvasRef.current) {
          fabricCanvasRef.current.dispose();
          fabricCanvasRef.current = null;
        }
        setIsCanvasReady(false);
      };
    } catch (error) {
      console.error('Error initializing canvas:', error);
      setIsCanvasReady(false);
    }
  }, []);

  return (
    <div className="workspace" style={{ width: '50%', height: '100%' }}>
      <canvas ref={canvasRef} />
      {!isCanvasReady && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)'
        }}>
          Loading workspace...
        </div>
      )}
    </div>
  );
};

export default Workspace;