import React, { useEffect } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = ({ code, setCode, editorRef }) => {
  
  useEffect(() => {
    const savedCode = localStorage.getItem('student_code');
    if (savedCode) {
      setCode(savedCode);
    }
  }, [setCode]);

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
        ref={editorRef} // Attach editorRef directly to AceEditor
        setOptions={{
          showLineNumbers: true,
          tabSize: 4,
          useWorker: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
