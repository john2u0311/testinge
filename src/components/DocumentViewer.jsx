import React, { useState } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Worker } from '@react-pdf-viewer/core';
import { highlightPlugin } from '@react-pdf-viewer/highlight';
import { SelectionMode } from '@react-pdf-viewer/selection-mode';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { bookmarkPlugin } from '@react-pdf-viewer/bookmark';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HighlightIcon from '@mui/icons-material/Highlight';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const DocumentViewer = ({ setLoading, onAnnotationUpdate }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const toolbarPluginInstance = toolbarPlugin();
  const bookmarkPluginInstance = bookmarkPlugin();
  
  const highlightPluginInstance = highlightPlugin({
    onHighlightClick: (highlight) => {
      const annotation = annotations.find(a => a.highlightId === highlight.id);
      if (annotation) {
        // Show annotation in a popup
        alert(annotation.text);
      }
    },
    onHighlightAdd: (highlight) => {
      setHighlights([...highlights, highlight]);
      const note = prompt('Add a note to this highlight:');
      if (note) {
        setAnnotations([...annotations, {
          highlightId: highlight.id,
          text: note,
          timestamp: new Date()
        }]);
      }
    }
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfFile(e.target.result);
        setLoading(false);
      };
      reader.onerror = () => {
        setLoading(false);
        alert('Error reading file');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextSelection = (e) => {
    setSelectedText(e.selectedText);
  };
  
  // Update any code that was using setAnnotations prop to use onAnnotationUpdate instead
  
  return (
    <div className="document-viewer">
      <div className="toolbar">
        <div className="file-input-wrapper">
          <button className="file-input-button">
            <PictureAsPdfIcon /> Open PDF
          </button>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
        </div>
        <button className="toolbar-button">
          <BookmarkIcon /> Bookmarks
        </button>
        <button className="toolbar-button">
          <HighlightIcon /> Highlight
        </button>
        <button className="toolbar-button">
          <NoteAddIcon /> Add Note
        </button>
      </div>
      <div className="viewer-container" style={{ display: 'flex', height: '750px' }}>
        <div className="bookmarks" style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }}>
          {bookmarkPluginInstance.renderBookmarks()}
        </div>
        <div className="pdf-viewer" style={{ flex: 1 }}>
          {pdfFile && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfFile}
                plugins={[
                  defaultLayoutPluginInstance,
                  highlightPluginInstance,
                  toolbarPluginInstance,
                  bookmarkPluginInstance
                ]}
                defaultScale={1}
                selectionMode={SelectionMode.Text}
                onTextSelection={handleTextSelection}
              />
            </Worker>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;