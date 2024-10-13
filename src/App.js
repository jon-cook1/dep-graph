import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import GraphDisplay from './components/GraphDisplay';

function App() {
  const [code, setCode] = useState('# Write your Python code here\n');

  return (
    <div className="app-container">
      <div className="editor-section">
        <CodeEditor code={code} setCode={setCode} />
      </div>
      <div className="graph-section">
        <GraphDisplay code={code} />
      </div>
    </div>
  );
}

export default App;
