// GraphDisplay.js

import React, { useEffect, useCallback, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import ReactFlow, { useNodesState, useEdgesState, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { applyStyles } from '../utils/GraphUtils';
import ace from 'ace-builds';

const GraphDisplay = forwardRef(({ nodes: initialNodes, edges: initialEdges, order, editorRef }, ref) => {
  const [nodes, setNodesState, onNodesChange] = useNodesState([]);
  const [edges, setEdgesState, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();
  const animationTimeoutRef = useRef([]);
  const [coloringStarted, setColoringStarted] = useState(false);
  const markerIdsRef = useRef([]);
  const colorClassesRef = useRef(new Map());

  const createColorClass = (color) => {
    if (!colorClassesRef.current.has(color)) {
      const className = `highlight-${color.replace('#', '')}`;
      const style = document.createElement('style');
      style.innerHTML = `
        .${className} {
          position: absolute;
          background: ${color}40;
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

      const colorClass = createColorClass(color);

      lineNumbers.forEach((line) => {
        const markerId = session.addMarker(new Range(line - 1, 0, line - 1, 1), colorClass, 'fullLine');
        markerIdsRef.current.push(markerId);
      });
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

    order.forEach(([id, color]) => {
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

      delay += 500;
    });
  }, [order, setNodesState, setEdgesState, highlightCodeLines]);

  // Use `useImperativeHandle` to expose `resetGraphColors` to parent component via `ref`
  useImperativeHandle(ref, () => ({
    resetGraphColors() {
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
        markerIdsRef.current.forEach((markerId) => session.removeMarker(markerId));
        markerIdsRef.current = [];
      }
    },
  }));

  useEffect(() => {
    if (nodes.length && edges.length && !coloringStarted) {
      runColorAnimation();
      setColoringStarted(true);
    }
  }, [nodes, edges, runColorAnimation, coloringStarted]);

  return (
    <div className="graph-display">
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} fitView />
    </div>
  );
});

export default GraphDisplay;
