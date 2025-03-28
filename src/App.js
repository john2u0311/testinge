import React, { useState } from 'react';
import DocumentViewer from './components/DocumentViewer';
import Workspace from './components/Workspace';
import AnnotationPanel from './components/AnnotationPanel';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [annotations, setAnnotations] = useState([]);

  const handleAnnotationClick = (annotation) => {
    // Handle annotation click
    console.log('Clicked annotation:', annotation);
  };

  return (
    <div className="app">
      {loading && <LoadingSpinner />}
      <div className="document-section">
        <DocumentViewer setLoading={setLoading} setAnnotations={setAnnotations} />
      </div>
      <div className="workspace-section">
        <Workspace />
        <AnnotationPanel 
          annotations={annotations} 
          onAnnotationClick={handleAnnotationClick}
        />
      </div>
    </div>
  );
}

export default App;