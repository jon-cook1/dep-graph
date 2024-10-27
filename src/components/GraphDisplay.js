import React, { useEffect, useCallback, useRef, useState } from 'react';
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

const GraphDisplay = ({ nodes: initialNodes, edges: initialEdges, order }) => {
  const [nodes, setNodesState, onNodesChange] = useNodesState([]);
  const [edges, setEdgesState, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();
  const animationTimeoutRef = useRef([]); // Ref to store animation timeouts
  const [coloringStarted, setColoringStarted] = useState(false); // Track if coloring has started

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

  const onLayout = useCallback(
    (direction, ranker = 'network-simplex') => {
      // Simulate double-click for layout change
      const doubleClickLayout = () => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
          nodes,
          edges,
          direction,
          ranker
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
            ranker
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

  const runColorAnimation = useCallback(() => {
    if (!order || !order.length) return;
  
    // Clear any existing timeouts before starting a new animation
    animationTimeoutRef.current.forEach(clearTimeout);
    animationTimeoutRef.current = [];
  
    let delay = 0;
  
    // Iterate through the order list and apply colors one by one
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
                    background: color, // Set node color
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
                  animated: true, // Animate edge
                  style: {
                    ...edge.style,
                    stroke: color, // Set edge color
                    strokeWidth: 6, // Set edge thickness
                  },
                };
              }
              return edge;
            })
          );
        }, delay)
      );
  
      delay += 500; // Delay for each step in the animation (you can adjust this)
    });
  }, [order, setNodesState, setEdgesState]);  

  // Trigger the color animation after rendering
  useEffect(() => {
    if (nodes.length && edges.length && !coloringStarted) {
      runColorAnimation();
      setColoringStarted(true);
    }
  }, [nodes, edges, runColorAnimation, coloringStarted]);

  // Reset graph colors to default
  const resetGraphColors = useCallback(() => {
    // Clear any existing timeouts
    animationTimeoutRef.current.forEach(clearTimeout);
    animationTimeoutRef.current = [];

    setNodesState((nds) =>
      nds.map((node) => ({
        ...node,
        style: {
          ...node.style,
          background: '#D3D3D3', // Reset to default color
        },
      }))
    );

    setEdgesState((eds) =>
      eds.map((edge) => ({
        ...edge,
        style: {
          ...edge.style,
          stroke: '#D3D3D3', // Reset to default color
        },
      }))
    );

    setColoringStarted(false); // Allow animation to start again
  }, [setNodesState, setEdgesState]);

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

const GraphDisplayWrapper = (props) => (
  <ReactFlowProvider>
    <GraphDisplay {...props} />
  </ReactFlowProvider>
);

export default GraphDisplayWrapper;
