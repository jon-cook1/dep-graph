import React from 'react';
import AceEditor from 'react-ace';

// Import AceEditor modes and themes
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = ({ code, setCode }) => {
  return (
    <div className="code-editor">
      <AceEditor
        mode="python"
        theme="monokai"
        name="code_editor"
        onChange={setCode}
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
    </div>
  );
};

export default CodeEditor;
