export const nodeStyles = {
  custominput: {
    background: '#D3D3D3', // Default gray background
    color: '#000000',       // White text color
    border: '2px solid #000000', // Solid black border
    borderRadius: '50%',    // Circular shape
    width: 100,             // Fixed width for all nodes
    height: 100,            // Fixed height for all nodes
    textAlign: 'center',    // Center the text inside the node
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  step: {
    background: '#D3D3D3', // Default gray background
    color: '#000000',       // White text color
    border: 'none',         // No border for step nodes
    borderRadius: '50%',    // Circular shape
    width: 100,             // Fixed width for all nodes
    height: 100,            // Fixed height for all nodes
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  target: {
    background: '#D3D3D3',  // Default gray background
    color: '#000000',        // White text color
    border: '2px outset #000000', // Outset black border
    borderRadius: '50%',    // Circular shape
    width: 100,             // Fixed width for all nodes
    height: 100,            // Fixed height for all nodes
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customoutput: {
    background: '#D3D3D3',   // Default gray background
    color: '#000000',         // White text color
    border: '2px dashed #000000', // Dashed black border
    borderRadius: '50%',     // Circular shape
    width: 100,              // Fixed width for all nodes
    height: 100,             // Fixed height for all nodes
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
  
  // Predefined styles for edges based on their types
  export const edgeStyles = {
    passing: {
      stroke: '#FF9900',
      strokeWidth: 3,
      animated: true,
      color: '#000000',  // Black text color for edges
    },
    internal: {
      stroke: '#00FFCC',
      strokeWidth: 2,
      animated: false,
      color: '#000000',  // Black text color for edges
    }
  };
  
  // Function to apply styles to nodes and edges based on type
  export const applyStyles = (nodes, edges) => {
    const styledNodes = nodes.map((node) => ({
      ...node,
      style: nodeStyles[node.mytype] || {},
    }));
  
    const styledEdges = edges.map((edge) => ({
      ...edge,
      style: edgeStyles[edge.mytype] || {},
    }));
  
    return { styledNodes, styledEdges };
  };
  