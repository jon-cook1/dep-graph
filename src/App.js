// App.js

import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import ButtonPanel from './components/ButtonPanel';
import CodeEditor from './components/CodeEditor';
import GraphDisplay from './components/GraphDisplay';
import { ReactFlowProvider } from 'reactflow';
import { initialNodes, initialEdges, order } from './graphElements';
import initialCode from './initialCode.json';

function App() {
  const [buffers, setBuffers] = useState({
    Original: initialCode.Original,
    Decomposed: '', // Always start with an empty Decomposed code
  });
  const [activeTab, setActiveTab] = useState('Original');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const editorRef = useRef(null);
  const graphRef = useRef(null);

  // Load any saved Original code from localStorage on component mount
  useEffect(() => {
    const savedOriginal = localStorage.getItem('Original');
    setBuffers((prevBuffers) => ({
      ...prevBuffers,
      Original: savedOriginal || initialCode.Original,
      Decomposed: '', // Ensure Decomposed starts empty on load
    }));
  }, []);

  // Save Original code to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('Original', buffers.Original);
  }, [buffers.Original]);

  const handleProcessCode = () => {
    // Populate Decomposed code only when "Process Code" is clicked
    const decomposedContent = initialCode.Decomposed;
    setBuffers((prevBuffers) => ({
      ...prevBuffers,
      Decomposed: decomposedContent,
    }));
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  const handleRerunAnimation = () => {
    if (graphRef.current) {
      graphRef.current.resetGraphColors();
    }
  };

  return (
    <div className="app-container">
      {/* Button Panel */}
      <ButtonPanel
        onProcessCode={handleProcessCode}
        onTabChange={setActiveTab}
        activeTab={activeTab}
        onRerunAnimation={handleRerunAnimation}
      />

      <div className="content-container">
        <div className="editor-section">
          <CodeEditor
            code={buffers[activeTab]}
            setCode={(newCode) =>
              setBuffers((prevBuffers) => ({
                ...prevBuffers,
                [activeTab]: newCode,
              }))
            }
            editorRef={editorRef}
          />
        </div>

        <div className="graph-section">
          <ReactFlowProvider>
            <GraphDisplay
              ref={graphRef}
              nodes={nodes}
              edges={edges}
              order={order}
              editorRef={editorRef}
              setNodes={setNodes}
              setEdges={setEdges}
            />
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
