// CodeEditor.js
import React, { useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = ({ code, setCode, editorRef }) => {
  // Sync code content with Ace Editor
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  return (
    <AceEditor
      ref={editorRef}
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
        useWorker: false,
      }}
    />
  );
};

export default CodeEditor;
