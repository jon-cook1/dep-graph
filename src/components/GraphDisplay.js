import React, { useEffect, useCallback, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import ReactFlow, { useNodesState, useEdgesState, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { applyStyles } from '../utils/GraphUtils';
import ace from 'ace-builds';

const GraphDisplay = forwardRef(
  ({ nodes: initialNodes, edges: initialEdges, order, editorRef, activeTab }, ref) => {
    const [nodes, setNodesState, onNodesChange] = useNodesState([]);
    const [edges, setEdgesState, onEdgesChange] = useEdgesState([]);
    const { fitView } = useReactFlow();
    const animationTimeoutRef = useRef([]);
    const [coloringStarted, setColoringStarted] = useState(false);
    const markerIdsRef = useRef([]);
    const colorClassesRef = useRef(new Map());
    const savedHighlightsRef = useRef([]); // Store cumulative original highlights
    const savedDecompHighlightsRef = useRef([]); // Store cumulative decomposed highlights

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

    const applyCurrentHighlights = useCallback(() => {
      if (editorRef.current && editorRef.current.editor) {
        const session = editorRef.current.editor.getSession();
        // Remove existing markers
        markerIdsRef.current.forEach((markerId) => session.removeMarker(markerId));
        markerIdsRef.current = [];

        // Determine highlights to apply based on active tab
        const highlights = activeTab === 'Original' ? savedHighlightsRef.current : savedDecompHighlightsRef.current;

        // Apply cumulative highlights
        highlights.forEach(({ lineNumbers, color }) => {
          const colorClass = createColorClass(color);
          lineNumbers.forEach((line) => {
            const Range = ace.require('ace/range').Range;
            const markerId = session.addMarker(new Range(line - 1, 0, line - 1, 1), colorClass, 'fullLine');
            markerIdsRef.current.push(markerId);
          });
        });
      }
    }, [editorRef, activeTab]);

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
      savedHighlightsRef.current = []; // Reset original highlights
      savedDecompHighlightsRef.current = []; // Reset decomposed highlights

      let delay = 0;

      order.forEach(([id, color]) => {
        animationTimeoutRef.current.push(
          setTimeout(() => {
            setNodesState((nds) =>
              nds.map((node) => {
                if (node.id === id) {
                  // Add to cumulative highlights
                  if (node.code_lines) {
                    savedHighlightsRef.current.push({ lineNumbers: node.code_lines, color });
                  }
                  if (node.decomp_code_lines) {
                    savedDecompHighlightsRef.current.push({ lineNumbers: node.decomp_code_lines, color });
                  }

                  // Update editor with current cumulative highlights
                  applyCurrentHighlights();

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
    }, [order, setNodesState, setEdgesState, applyCurrentHighlights]);

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

    // Update editor highlights whenever activeTab changes
    useEffect(() => {
      applyCurrentHighlights();
    }, [activeTab, applyCurrentHighlights]);

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
  }
);

export default GraphDisplay;
