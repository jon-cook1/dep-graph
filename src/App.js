import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import GraphDisplay from './components/GraphDisplay';

import { initialNodes, initialEdges } from './graphElements';

function App() {
  const [code, setCode] = useState('# Write your Python code here\n');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleProcessCode = () => {
    // Use hardcoded data
    setNodes(initialNodes);
    setEdges(initialEdges);

    // Backend
    /*
    fetch('your-backend-endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
      .then(response => response.json())
      .then(data => {
        setNodes(data.nodes);
        setEdges(data.edges);
      })
      .catch(error => console.error('Error:', error));
    */
  };

  return (
    <div className="app-container">
      <div className="editor-section">
        <button className="process-button" onClick={handleProcessCode}>
          Process Code
        </button>
        <CodeEditor code={code} setCode={setCode} />
      </div>
      <div className="graph-section">
        <GraphDisplay
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
        />
      </div>
    </div>
  );
}

export default App;
