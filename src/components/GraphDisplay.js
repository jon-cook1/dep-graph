import React, { useEffect, useCallback, useRef, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import ELK from 'elkjs'; // Import ELK for graph layout
import { applyStyles } from '../utils/GraphUtils'; // Import applyStyles from utils

const elk = new ELK();

// Function to get ELK layout
const getElkLayout = async (nodes, edges, direction = 'DOWN') => {
  const graph = {
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'mrtree', // Use the "mrtree" algorithm for shortest path-like organization
      'elk.direction': direction, // 'DOWN' for top-down, 'RIGHT' for left-to-right
      'elk.spacing.nodeNode': '50',  // Space between nodes
      'elk.spacing.edgeNode': '50',  // Space between edges and nodes
      'elk.spacing.edgeEdge': '50',  // Space between edges
    },
    children: nodes.map((node) => ({
      id: node.id,
      width: 100,  // Node width
      height: 100,  // Node height
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    })),
  };

  const layout = await elk.layout(graph);
  const layoutedNodes = layout.children.map((node, index) => ({
    ...nodes[index],
    position: { x: node.x, y: node.y },
  }));

  return { layoutedNodes, edges };
};


const GraphDisplay = ({ nodes: initialNodes, edges: initialEdges, order }) => {
  const [nodes, setNodesState, onNodesChange] = useNodesState([]);
  const [edges, setEdgesState, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();
  const animationTimeoutRef = useRef([]);
  const [coloringStarted, setColoringStarted] = useState(false);

  // Update local state and layout when props change
  useEffect(() => {
    if (initialNodes.length && initialEdges.length) {
      const { styledNodes, styledEdges } = applyStyles(initialNodes, initialEdges); // Apply styles

      getElkLayout(styledNodes, styledEdges, 'TB').then(({ layoutedNodes, edges: layoutedEdges }) => {
        setNodesState(layoutedNodes);
        setEdgesState(layoutedEdges);
        fitView();
      });
    }
  }, [initialNodes, initialEdges, setNodesState, setEdgesState, fitView]);

  const onLayout = useCallback(
    (direction) => {
      getElkLayout(nodes, edges, direction).then(({ layoutedNodes, edges: layoutedEdges }) => {
        setNodesState(layoutedNodes);
        setEdgesState(layoutedEdges);
        fitView();
      });
    },
    [nodes, edges, setNodesState, setEdgesState, fitView]
  );

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
                return {
                  ...node,
                  style: {
                    ...node.style,
                    background: color
                  }
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
                    strokeWidth: 6
                  }
                };
              }
              return edge;
            })
          );
        }, delay)
      );

      delay += 500;
    });
  }, [order, setNodesState, setEdgesState]);

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
          background: '#D3D3D3'
        }
      }))
    );

    setEdgesState((eds) =>
      eds.map((edge) => ({
        ...edge,
        style: {
          ...edge.style,
          stroke: '#D3D3D3'
        }
      }))
    );

    setColoringStarted(false);
  }, [setNodesState, setEdgesState]);

  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  return (
    <div className="graph-display">
      <div className="layout-buttons">
        <button style={buttonStyle} onClick={() => onLayout('TB')}>
          Vertical Layout
        </button>
        <button style={buttonStyle} onClick={() => onLayout('LR')}>
          Horizontal Layout
        </button>
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
