import React, { useEffect, useCallback, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import ReactFlow, { useNodesState, useEdgesState, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { applyStyles } from '../utils/GraphUtils';
import ace from 'ace-builds';

const GraphDisplay = forwardRef(
  ({ nodes: initialNodes, edges: initialEdges, order, editorRef, activeTab, noColor }, ref) => {
    const [nodes, setNodesState, onNodesChange] = useNodesState([]);
    const [edges, setEdgesState, onEdgesChange] = useEdgesState([]);
    const { fitView } = useReactFlow();
    const animationTimeoutRef = useRef([]);
    const activeTabRef = useRef(activeTab); // Ref to track the latest activeTab
    const noColorRef = useRef(noColor); // Ref to track the latest noColor state
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

    const clearHighlights = useCallback(() => {
      if (editorRef.current && editorRef.current.editor) {
        const session = editorRef.current.editor.getSession();
        markerIdsRef.current.forEach((markerId) => session.removeMarker(markerId));
        markerIdsRef.current = [];
      }
    }, [editorRef]);

    const applyHighlightsForTab = useCallback(
      (currentTab) => {
        // Use latest noColorRef state
        if (noColorRef.current) {
          clearHighlights();
          return;
        }

        if (editorRef.current && editorRef.current.editor) {
          const session = editorRef.current.editor.getSession();
          markerIdsRef.current.forEach((markerId) => session.removeMarker(markerId));
          markerIdsRef.current = [];

          const highlights = currentTab === 'Original' ? savedHighlightsRef.current : savedDecompHighlightsRef.current;

          highlights.forEach(({ lineNumbers, color }) => {
            const colorClass = createColorClass(color);
            lineNumbers.forEach((line) => {
              const Range = ace.require('ace/range').Range;
              const markerId = session.addMarker(new Range(line - 1, 0, line - 1, 1), colorClass, 'fullLine');
              markerIdsRef.current.push(markerId);
            });
          });
        }
      },
      [editorRef, clearHighlights]
    );

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
      savedHighlightsRef.current = [];
      savedDecompHighlightsRef.current = [];

      let delay = 500; // Initial delay before the first node is colored

      order.forEach(([id, color]) => {
        animationTimeoutRef.current.push(
          setTimeout(() => {
            setNodesState((nds) =>
              nds.map((node) => {
                if (node.id === id) {
                  if (node.code_lines) {
                    savedHighlightsRef.current.push({ lineNumbers: node.code_lines, color });
                  }
                  if (node.decomp_code_lines) {
                    savedDecompHighlightsRef.current.push({ lineNumbers: node.decomp_code_lines, color });
                  }

                  // Apply highlights based on the latest noColorRef state
                  if (!noColorRef.current) {
                    applyHighlightsForTab(activeTabRef.current);
                  } else {
                    clearHighlights(); // Clear highlights if noColor is toggled during animation
                  }

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

        delay += 500; // Increment delay for each subsequent node
      });
    }, [order, setNodesState, setEdgesState, applyHighlightsForTab, clearHighlights]);

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

        clearHighlights();
      },
    }));

    useEffect(() => {
      activeTabRef.current = activeTab;
      applyHighlightsForTab(activeTab);
    }, [activeTab, applyHighlightsForTab]);

    useEffect(() => {
      if (nodes.length && edges.length && !coloringStarted) {
        runColorAnimation();
        setColoringStarted(true);
      }
    }, [nodes, edges, runColorAnimation, coloringStarted]);

    // Update noColorRef whenever noColor changes
    useEffect(() => {
      noColorRef.current = noColor;
      if (noColor) {
        clearHighlights();
      } else {
        applyHighlightsForTab(activeTab);
      }
    }, [noColor, applyHighlightsForTab, clearHighlights, activeTab]);

    return (
      <div className="graph-display">
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} fitView />
      </div>
    );
  }
);

export default GraphDisplay;
