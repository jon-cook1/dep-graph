// Predefined styles for nodes based on their types
export const nodeStyles = {
    input: { background: '#FFCCCC', border: '2px solid #FF0000' },
    step: { background: '#CCFFCC', border: '2px solid #00FF00' },
    target: { background: '#CCCCFF', border: '2px solid #0000FF' },
    output: { background: '#FFFFCC', border: '2px solid #FFFF00' }
  };
  
  // Predefined styles for edges based on their types
  export const edgeStyles = {
    passing: { stroke: '#FF9900', strokeWidth: 3, animated: true },
    internal: { stroke: '#00FFCC', strokeWidth: 2, animated: false }
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
  