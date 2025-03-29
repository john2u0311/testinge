import React, { useState } from 'react';
import DocumentViewer from './components/DocumentViewer';
import Workspace from './components/Workspace';

function App() {
  const [loading, setLoading] = useState(false);
  const [annotations, setAnnotations] = useState([]);

  return (
    <div className="App" style={{ display: 'flex', height: '100vh' }}>
      <DocumentViewer 
        setLoading={setLoading} 
        onAnnotationUpdate={setAnnotations} 
      />
      <Workspace />
    </div>
  );
}

export default App;