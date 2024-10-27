// Predefined styles for nodes based on their types
export const nodeStyles = {
    input: {
      background: '#D3D3D3', // Default gray background
      color: '#000000',       // White text color
      border: '2px solid #000000', // Solid black border
      borderRadius: '50px',   // 50px border radius
    },
    step: {
      background: '#D3D3D3', // Default gray background
      color: '#000000',       // White text color
      border: 'none',         // No border for step nodes
      borderRadius: '50px',   // 50px border radius
    },
    target: {
      background: '#D3D3D3',  // Default gray background
      color: '#000000',        // White text color
      border: '2px outset #000000', // Outset black border
      borderRadius: '50px',    // 50px border radius
    },
    output: {
      background: '#D3D3D3',   // Default gray background
      color: '#000000',         // White text color
      border: '2px dashed #000000', // Dashed black border
      borderRadius: '50px',     // 50px border radius
    }
  };
  
  // Predefined styles for edges based on their types
  export const edgeStyles = {
    passing: {
      stroke: '#FF9900',
      strokeWidth: 3,
      animated: true,
      color: '#000000', // Black text color for edges
    },
    internal: {
      stroke: '#00FFCC',
      strokeWidth: 2,
      animated: false,
      color: '#000000', // Black text color for edges
    }
  };
  
  // Function to apply styles to nodes and edges based on type
  export const applyStyles = (nodes, edges) => {
    const styledNodes = nodes.map((node) => ({
      ...node,
      style: nodeStyles[node.type] || {}
    }));
  
    const styledEdges = edges.map((edge) => ({
      ...edge,
      style: edgeStyles[edge.type] || {}
    }));
  
    return { styledNodes, styledEdges };
  };
  