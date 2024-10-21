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
    nodesep: 50,  // Node separation
    ranksep: 70,  // Rank separation
  });

  // Add nodes to the graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  // Add edges to the graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Compute the layout
  dagre.layout(dagreGraph);

  // Apply the computed positions to the nodes
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
  const animationTimeoutRef = useRef([]); // To store timeouts for resetting

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
    // Clear any existing timeouts
    animationTimeoutRef.current.forEach(clearTimeout);
    animationTimeoutRef.current = [];

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

  // DFS Function to color nodes and edges recursively
  const colorNodesAndEdgesDFS = useCallback(() => {
    const visitedNodes = new Set();
    const visitedEdges = new Set();
    let delay = 0;

    // Clear any existing timeouts
    animationTimeoutRef.current.forEach(clearTimeout);
    animationTimeoutRef.current = [];

    const dfsTraverse = (currentNodeId) => {
      if (visitedNodes.has(currentNodeId)) return;

      // Mark the node as visited and color it after a delay
      animationTimeoutRef.current.push(
        setTimeout(() => {
          setNodesState((nds) =>
            nds.map((node) => {
              if (node.id === currentNodeId) {
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
        }, delay)
      );
      visitedNodes.add(currentNodeId);
      delay += 500; // Delay between node coloring

      // Get all edges starting from the current node
      const outgoingEdges = edges.filter(
        (edge) => edge.source === currentNodeId && !visitedEdges.has(edge.id)
      );

      outgoingEdges.forEach((edge) => {
        // Mark the edge as visited and color it after a delay
        animationTimeoutRef.current.push(
          setTimeout(() => {
            setEdgesState((eds) =>
              eds.map((ed) => {
                if (ed.id === edge.id) {
                  return {
                    ...ed,
                    style: {
                      ...ed.style,
                      stroke: '#00FF00', // Color edge when active
                      strokeWidth: 10, // Increase width
                    },
                    animated: true, // Start animating the edge
                  };
                }
                return ed;
              })
            );
          }, delay)
        );
        visitedEdges.add(edge.id);
        delay += 500; // Delay between edge coloring

        // Recursively traverse the target node
        dfsTraverse(edge.target);
      });
    };

    // Start DFS from the first node
    dfsTraverse('node1');
  }, [edges, setNodesState, setEdgesState]);

  // Handle rerun animation button click
  const handleRerunAnimation = useCallback(() => {
    resetGraphColors(); // Reset all colors first
    setColoringStarted(false); // Allow the DFS to start again
  }, [resetGraphColors]);

  // Trigger the node and edge coloring after rendering
  useEffect(() => {
    if (nodes.length && edges.length && !coloringStarted) {
      colorNodesAndEdgesDFS();
      setColoringStarted(true); // Ensure DFS only starts once
    }
  }, [nodes, edges, colorNodesAndEdgesDFS, coloringStarted]);

  const onLayout = useCallback(
    (direction, ranker = 'network-simplex') => {
      // Trigger layout
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction,
        ranker  // Apply the selected ranker
      );
      setNodesState(layoutedNodes);
      setEdgesState(layoutedEdges);
      fitView();
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

const GraphDisplayWrapper = (props) => (
  <ReactFlowProvider>
    <GraphDisplay {...props} />
  </ReactFlowProvider>
);

export default GraphDisplayWrapper;
