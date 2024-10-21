import React, { useCallback, useEffect, useState, useRef } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';

// Use Dagre library to format graph into tree
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 150;
const nodeHeight = 50;

const getLayoutedElements = (nodes, edges, direction = 'TB', ranker = 'network-simplex') => {
  const isHorizontal = direction === 'LR';

  // Set graph with ranker and direction
  dagreGraph.setGraph({
    rankdir: direction,
    ranker: ranker,
  });

  // Set manual ordering by rank constraints
  dagreGraph.setGraph({
    nodesep: 50,  // Node separation
    rankdir: direction,
    ranker,
  });

  // Add manual ranking through rank constraints
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';
    return node;
  });

  return { nodes: layoutedNodes, edges };
};

const GraphDisplay = ({ nodes: initialNodes, edges: initialEdges }) => {
  const [nodes, setNodesState, onNodesChange] = useNodesState([]);
  const [edges, setEdgesState, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();
  const [coloringStarted, setColoringStarted] = useState(false); // Track if coloring has started
  const animationIntervalRef = useRef(null); // To store the interval ID for resetting

  // Update local state and layout when props change
  useEffect(() => {
    if (initialNodes.length && initialEdges.length) {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialNodes,
        initialEdges,
        'TB',  // Default layout direction is vertical
        'network-simplex'  // Default ranker
      );
      setNodesState(layoutedNodes);
      setEdgesState(layoutedEdges);
      fitView();
    }
  }, [initialNodes, initialEdges, setNodesState, setEdgesState, fitView]);

  // Reset all nodes and edges to base colors
    const resetGraphColors = useCallback(() => {
    // Reset nodes to their base color
    setNodesState((nds) =>
      nds.map((node) => ({
        ...node,
        style: {
          ...node.style,
          background: '#D3D3D3', // Default inactive color
        },
      }))
    );
  
    // Reset edges to their base color, non-animated, and stroke width 1
    setEdgesState((eds) =>
      eds.map((edge) => ({
        ...edge,
        style: {
          ...edge.style,
          stroke: '#D3D3D3', // Default inactive color
          strokeWidth: 1,    // Reset stroke width to 1
        },
        animated: false,      // Reset animation to false
      }))
    );
  }, [setNodesState, setEdgesState]);
  

  // BFS Function to color nodes and edges one by one
  // BFS Function to color nodes and edges one by one
// BFS Function to color nodes and edges level by level
const colorNodesAndEdgesBFS = useCallback(() => {
    let queue = ['node1']; // Start BFS from node1
    const visited = new Set();
  
    // Clear any existing intervals
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }
  
    const interval = setInterval(() => {
      if (queue.length > 0) {
        const currentLevel = [...queue]; // Get all nodes at the current level
        queue = []; // Clear the queue for the next level
  
        // Color all nodes at the current level
        setNodesState((nds) =>
          nds.map((node) => {
            if (currentLevel.includes(node.id)) {
              visited.add(node.id); // Mark node as visited
              return {
                ...node,
                style: {
                  ...node.style,
                  background: '#00FF00', // Color node when active
                },
              };
            }
            return node;
          })
        );
  
        // After a delay, color the edges connecting to the next level and enqueue next-level nodes
        setTimeout(() => {
          setEdgesState((eds) =>
            eds.map((edge) => {
              if (currentLevel.includes(edge.source) && !visited.has(edge.target)) {
                queue.push(edge.target); // Enqueue the target node for the next level
                return {
                  ...edge,
                  style: {
                    ...edge.style,
                    stroke: '#00FF00', // Color the edge when active
                    strokeWidth: 10,   // Increase width
                  },
                  animated: true,      // Start animating the edge
                };
              }
              return edge;
            })
          );
        }, 500); // Add a delay for edge coloring after all nodes are colored
      } else {
        clearInterval(interval); // Stop when the queue is empty
      }
    }, 1000); // Process nodes and edges level-by-level every 1 second
  
    animationIntervalRef.current = interval; // Store interval ID
  }, [setNodesState, setEdgesState]);
  



  // Handle rerun animation button click
  const handleRerunAnimation = useCallback(() => {
    resetGraphColors(); // Reset all colors first
    setColoringStarted(false); // Allow the BFS to start again
  }, [resetGraphColors]);

  // Trigger the node and edge coloring after rendering
  useEffect(() => {
    if (nodes.length && edges.length && !coloringStarted) {
      colorNodesAndEdgesBFS();
      setColoringStarted(true); // Ensure BFS only starts once
    }
  }, [nodes, edges, colorNodesAndEdgesBFS, coloringStarted]);

  const onLayout = useCallback(
    (direction, ranker = 'network-simplex') => {
      // Trigger layout twice to ensure correct formatting
      const doubleClickLayout = () => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
          nodes,
          edges,
          direction,
          ranker  // Apply the selected ranker
        );
        setNodesState(layoutedNodes);
        setEdgesState(layoutedEdges);
        fitView();
        // Trigger layout again
        setTimeout(() => {
          const { nodes: reLayoutedNodes, edges: reLayoutedEdges } = getLayoutedElements(
            nodes,
            edges,
            direction,
            ranker  // Apply the selected ranker
          );
          setNodesState(reLayoutedNodes);
          setEdgesState(reLayoutedEdges);
          fitView();
        }, 50); // Small delay for the second click effect
      };
      doubleClickLayout();
    },
    [nodes, edges, setNodesState, setEdgesState, fitView]
  );

  // Inline style for buttons matching "Process Code" button
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
      <div className="layout-buttons">
        <button style={buttonStyle} onClick={() => onLayout('TB', 'network-simplex')}>
          Vertical Layout
        </button>
        <button style={buttonStyle} onClick={() => onLayout('LR', 'network-simplex')}>
          Horizontal Layout
        </button>
        <button style={buttonStyle} onClick={handleRerunAnimation}>
          Rerun Animation
        </button> {/* New button with inline style */}
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

const GraphDisplayWrapper = (props) => (
  <ReactFlowProvider>
    <GraphDisplay {...props} />
  </ReactFlowProvider>
);

export default GraphDisplayWrapper;
