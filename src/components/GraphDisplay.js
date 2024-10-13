import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';
import ELK from 'elkjs/lib/elk.bundled.js';
import 'reactflow/dist/style.css';

const elk = new ELK();

const GraphContent = ({ code }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [layoutDirection, setLayoutDirection] = useState('TB');
  const { fitView } = useReactFlow();

  const getLayoutedElements = useCallback(
    async (nodes, edges, direction = 'TB') => {
      const graph = {
        id: 'root',
        layoutOptions: {
          'elk.algorithm': 'layered',
          'elk.direction': direction,
          'elk.layered.spacing.nodeNodeBetweenLayers': '100',
          'elk.spacing.nodeNode': '50',
        },
        children: nodes.map((node) => ({
          ...node,
          width: 150,
          height: 50,
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          sources: [edge.source],
          targets: [edge.target],
        })),
      };

      const layoutedGraph = await elk.layout(graph);

      const layoutedNodes = layoutedGraph.children.map((node) => ({
        ...nodes.find((n) => n.id === node.id),
        position: { x: node.x, y: node.y },
      }));

      return {
        nodes: layoutedNodes,
        edges,
      };
    },
    []
  );

  const handleProcessCode = useCallback(async () => {
    // Temporarily use hardcoded data
    const responseNodes = [
      { id: '1', data: { label: 'Node 1' }, position: { x: 0, y: 0 } },
      { id: '2', data: { label: 'Node 2' }, position: { x: 0, y: 0 } },
    ];
    const responseEdges = [
      { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
    ];

    const layoutedElements = await getLayoutedElements(
      responseNodes,
      responseEdges,
      layoutDirection
    );

    setNodes(layoutedElements.nodes);
    setEdges(layoutedElements.edges);
    fitView();
  }, [getLayoutedElements, layoutDirection, fitView, setNodes, setEdges]);

  useEffect(() => {
    handleProcessCode();
  }, [handleProcessCode]);

  return (
    <div className="graph-container">
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

const GraphDisplay = ({ code }) => {
  return (
    <ReactFlowProvider>
      <GraphContent code={code} />
    </ReactFlowProvider>
  );
};

export default GraphDisplay;
