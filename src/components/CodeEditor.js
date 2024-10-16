import React, { useEffect } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = ({ code, setCode }) => {
  
  // Load code from localStorage when the component mounts
  useEffect(() => {
    const savedCode = localStorage.getItem('student_code');
    if (savedCode) {
      setCode(savedCode);
    }
  }, [setCode]);

  // Save code to localStorage
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    localStorage.setItem('student_code', newCode);
  };

  return (
    <div className="code-editor">
      <AceEditor
        mode="python"
        theme="monokai"
        name="code_editor"
        onChange={handleCodeChange}
        value={code}
        width="100%"
        height="100%"
        fontSize={14}
        setOptions={{
          showLineNumbers: true,
          tabSize: 4,
          useWorker: false, // Disable syntax checking
        }}
      />
    </div>
  );
};

export default CodeEditor;
