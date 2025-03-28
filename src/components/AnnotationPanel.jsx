import React from 'react';

const AnnotationPanel = ({ annotations, highlights, onAnnotationClick }) => {
  return (
    <div className="annotation-panel">
      <h3>Annotations</h3>
      <div className="annotation-list">
        {annotations.map((annotation, index) => (
          <div 
            key={index} 
            className="annotation-item"
            onClick={() => onAnnotationClick(annotation)}
          >
            <p>{annotation.text}</p>
            <small>{new Date(annotation.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnotationPanel;