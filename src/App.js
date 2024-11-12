// App.js

import React, { useState, useRef } from 'react';
import './App.css';
import ButtonPanel from './components/ButtonPanel';
import CodeEditor from './components/CodeEditor';
import GraphDisplay from './components/GraphDisplay';
import { ReactFlowProvider } from 'reactflow';
import { initialNodes, initialEdges, order } from './graphElements';

function App() {
  const [buffers, setBuffers] = useState({
    Original: '# Write your Python code here\n',
    Decomposed: '',
  });
  const [activeTab, setActiveTab] = useState('Original');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  
  const editorRef = useRef(null); // Ref for the CodeEditor
  const graphDisplayRef = useRef(null); // Ref for GraphDisplay to access resetGraphColors

  const handleProcessCode = () => {
    const decomposedContent = `# Decomposed code based on ${buffers.Original}`;
    setBuffers((prevBuffers) => ({
      ...prevBuffers,
      Decomposed: decomposedContent,
    }));
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  const handleRerunAnimation = () => {
    if (graphDisplayRef.current) {
      graphDisplayRef.current.resetGraphColors();
    }
  };

  return (
    <div className="app-container">
      {/* Place ButtonPanel at the top, spanning full width */}
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
              ref={graphDisplayRef} // Attach ref to GraphDisplay for resetGraphColors access
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
