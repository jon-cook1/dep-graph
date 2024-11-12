import React, { useEffect, useCallback, useRef, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { applyStyles } from '../utils/GraphUtils';
import ace from 'ace-builds';

const GraphDisplay = ({ nodes: initialNodes, edges: initialEdges, order, editorRef }) => {
  const [nodes, setNodesState, onNodesChange] = useNodesState([]);
  const [edges, setEdgesState, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();
  const animationTimeoutRef = useRef([]);
  const [coloringStarted, setColoringStarted] = useState(false);
  const markerIdsRef = useRef([]); // Store marker IDs here
  const colorClassesRef = useRef(new Map()); // Map to store color classes

  // Function to create a unique CSS class for each color
  const createColorClass = (color) => {
    if (!colorClassesRef.current.has(color)) {
      const className = `highlight-${color.replace('#', '')}`;
      const style = document.createElement('style');
      style.innerHTML = `
        .${className} {
          position: absolute;
          background: ${color}40; /* Use transparency */
          z-index: 20;
        }
      `;
      document.head.appendChild(style);
      colorClassesRef.current.set(color, className);
    }
    return colorClassesRef.current.get(color);
  };
  

  const highlightCodeLines = useCallback((lineNumbers, color) => {
    if (editorRef.current && editorRef.current.editor) {
      const session = editorRef.current.editor.getSession();
      const Range = ace.require('ace/range').Range;
  
      // Get the CSS class for the specified color
      const colorClass = createColorClass(color);
  
      lineNumbers.forEach(line => {
        // Add a marker for each line without clearing existing markers
        const markerId = session.addMarker(
          new Range(line - 1, 0, line - 1, 1),
          colorClass,
          'fullLine'
        );
        markerIdsRef.current.push(markerId); // Track each marker
        console.log(`Persistently highlighting line ${line} with color ${color}`);
      });
    } else {
      console.warn('editorRef.current.editor is not available');
    }
  }, [editorRef]);
  

  useEffect(() => {
    if (initialNodes.length && initialEdges.length) {
      const { styledNodes, styledEdges } = applyStyles(initialNodes, initialEdges);
      setNodesState(styledNodes);
      setEdgesState(styledEdges);
      fitView();
    }
  }, [initialNodes, initialEdges, setNodesState, setEdgesState, fitView]);

  const runColorAnimation = useCallback(() => {
    if (!order || !order.length) return;

    animationTimeoutRef.current.forEach(clearTimeout);
    animationTimeoutRef.current = [];

    let delay = 0;

    order.forEach(([id, color], index) => {
      animationTimeoutRef.current.push(
        setTimeout(() => {
          setNodesState((nds) =>
            nds.map((node) => {
              if (node.id === id) {
                highlightCodeLines(node.code_lines || [], color);
                return {
                  ...node,
                  style: {
                    ...node.style,
                    background: color,
                  },
                };
              }
              return node;
            })
          );

          setEdgesState((eds) =>
            eds.map((edge) => {
              if (edge.id === id) {
                return {
                  ...edge,
                  animated: true,
                  style: {
                    ...edge.style,
                    stroke: color,
                    strokeWidth: 6,
                  },
                };
              }
              return edge;
            })
          );
        }, delay)
      );

      delay += 500; // Increase delay to allow time for highlighting each step
    });
  }, [order, setNodesState, setEdgesState, highlightCodeLines]);

  useEffect(() => {
    if (nodes.length && edges.length && !coloringStarted) {
      runColorAnimation();
      setColoringStarted(true);
    }
  }, [nodes, edges, runColorAnimation, coloringStarted]);

  const resetGraphColors = useCallback(() => {
    animationTimeoutRef.current.forEach(clearTimeout);
    animationTimeoutRef.current = [];

    setNodesState((nds) =>
      nds.map((node) => ({
        ...node,
        style: {
          ...node.style,
          background: '#D3D3D3',
        },
      }))
    );

    setEdgesState((eds) =>
      eds.map((edge) => ({
        ...edge,
        style: {
          ...edge.style,
          stroke: '#D3D3D3',
        },
      }))
    );

    setColoringStarted(false);

    if (editorRef.current && editorRef.current.editor && editorRef.current.editor.getSession()) {
      const session = editorRef.current.editor.getSession();
      markerIdsRef.current.forEach(markerId => session.removeMarker(markerId));
      markerIdsRef.current = []; // Clear marker IDs
    }
  }, [setNodesState, setEdgesState, editorRef]);

  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <div className="graph-display">
      <div style={{ marginBottom: '10px' }}>
        <button style={buttonStyle} onClick={resetGraphColors}>
          Rerun Animation
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      />
    </div>
  );
};

export default GraphDisplay;
