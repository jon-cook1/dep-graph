import React from 'react';
import AceEditor from 'react-ace';

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
          useWorker: false, // Disable syntax checking
        }}
      />
    </div>
  );
};

export default CodeEditor;
