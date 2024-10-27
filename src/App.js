import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import GraphDisplay from './components/GraphDisplay';
import { ReactFlowProvider } from 'reactflow'; // Import ReactFlowProvider
import { initialNodes, initialEdges, order } from './graphElements';

function App() {
  const [code, setCode] = useState('# Write your Python code here\n');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleProcessCode = async () => {
    // For development purposes, use hardcoded data
    setNodes(initialNodes);
    setEdges(initialEdges);

    // TODO: Uncomment to connect to backend
    /*
    try {
      const response = await fetch('http://your-backend-endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      setNodes(data.nodes);
      setEdges(data.edges);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Optionally, display an error message to the user
    }
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
