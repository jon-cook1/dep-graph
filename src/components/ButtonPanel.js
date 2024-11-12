// ButtonPanel.js

import React from 'react';
import '../ButtonPanel.css';

const ButtonPanel = ({ onProcessCode, onTabChange, activeTab, onRerunAnimation }) => {
  return (
    <div className="button-panel">
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'Original' ? 'active' : ''}`}
          onClick={() => onTabChange('Original')}
        >
          Original
        </button>
        <button
          className={`tab-button ${activeTab === 'Decomposed' ? 'active' : ''}`}
          onClick={() => onTabChange('Decomposed')}
        >
          Decomposed
        </button>
      </div>
      <button className="process-button" onClick={onProcessCode}>
        Process Code
      </button>
      <button className="rerun-button" onClick={onRerunAnimation}>
        Rerun Animation
      </button>

    </div>
  );
};

export default ButtonPanel;
