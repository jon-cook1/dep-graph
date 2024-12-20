import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import GraphDisplay from './components/GraphDisplay';
import { ReactFlowProvider } from 'reactflow';
import { initialNodes, initialEdges, order } from './graphElements';

// Toggle between hardcoded data and API
const USE_API = true;  // Set to true for API data, false for hardcoded data

function App() {
  const [code, setCode] = useState('# Write your Python code here\n');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleProcessCode = async () => {
    if (USE_API) {
      try {
        const response = await fetch('http://127.0.0.1:8000/endpoint/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source: code }),
        });
        const data = await response.json();
        setNodes(data.nodes);
        setEdges(data.edges);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      // Use hardcoded data
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
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
        <ReactFlowProvider>
          <GraphDisplay
            nodes={nodes}
            edges={edges}
            order={order}
            setNodes={setNodes}
            setEdges={setEdges}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default App;
