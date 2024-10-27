const position = { x: 0, y: 0 };

export const initialNodes = [
  {
    id: 'node1',
    type: 'input',
    data: { label: 'Student Code' },
    position,
    style: {
      background: '#D3D3D3',
      color: '#000',
      border: '2px solid #000',
      borderRadius: '50px',
      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
      fontSize: '12px',
      padding: '10px',
    },
  },
  {
    id: 'node2',
    data: { label: 'Decomposition' },
    position,
    style: {
      background: '#D3D3D3',
      color: '#000',
      border: '2px solid #000',
      borderRadius: '50px',
      padding: '10px',
      fontSize: '12px',
      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
    },
  },
  {
    id: 'node3',
    data: { label: 'Func 3' },
    position,
    style: {
      background: '#D3D3D3',
      color: '#000',
      border: '2px solid #000',
      borderRadius: '50px',
      padding: '10px',
      fontSize: '12px',
    },
  },
  {
    id: 'node4',
    data: { label: 'Func 4' },
    position,
    style: {
      background: '#D3D3D3',
      color: '#000',
      border: '2px solid #000',
      borderRadius: '50px',
      padding: '10px',
      fontSize: '12px',
    },
  },
  {
    id: 'node5',
    data: { label: 'Logic 5' },
    position,
    style: {
      background: '#D3D3D3',
      color: '#000',
      border: '2px solid #000',
      borderRadius: '50px',
      padding: '10px',
      fontSize: '12px',
    },
  },
  {
    id: 'node6',
    data: { label: 'Loop 6' },
    position,
    style: {
      background: '#D3D3D3',
      color: '#000',
      border: '2px solid #000',
      borderRadius: '50px',
      padding: '10px',
      fontSize: '12px',
    },
  },
  {
    id: 'node7',
    data: { label: 'Intermediate 7' },
    position,
    style: {
      background: '#D3D3D3',
      color: '#000',
      border: '2px solid #000',
      borderRadius: '50px',
      padding: '10px',
      fontSize: '12px',
    },
  },
  {
    id: 'node8',
    data: { label: 'Helper Func 8' },
    position,
    style: {
      background: '#D3D3D3',
      color: '#000',
      border: '2px solid #000',
      borderRadius: '50px',
      padding: '10px',
      fontSize: '12px',
    },
  },
  {
    id: 'node9',
    data: { label: 'Main Process 9' },
    position,
    style: {
      background: '#D3D3D3',
      color: '#000',
      border: '2px solid #000',
      borderRadius: '50px',
      padding: '10px',
      fontSize: '12px',
    },
  },
  {
    id: 'node10',
    type: 'output',
    data: { label: 'Result A' },
    position,
    style: {
      background: '#D3D3D3',
      color: '#000',
      border: '2px solid #000',
      borderRadius: '50px',
      padding: '10px',
      fontSize: '12px',
    },
  },
  {
    id: 'node11',
    type: 'output',
    data: { label: 'Result B' },
    position,
    style: {
      background: '#D3D3D3',
      color: '#000',
      border: '2px solid #000',
      borderRadius: '50px',
      padding: '10px',
      fontSize: '12px',
    },
  },
];

export const initialEdges = [
  {
    id: 'edge1-2',
    source: 'node1',
    target: 'node2',
    animated: false, // Start with no animation
    type: 'smoothstep',
    style: { stroke: '#D3D3D3', strokeWidth: 1 }, // Stroke width is initially 1
    label: 'To Decomp',
    labelStyle: { fill: '#000', fontSize: '12px' },
  },
  {
    id: 'edge1-7',
    source: 'node1',
    target: 'node7',
    animated: false,
    type: 'smoothstep',
    style: { stroke: '#D3D3D3', strokeWidth: 1 },
    label: 'To Intermed',
    labelStyle: { fill: '#000', fontSize: '12px' },
  },
  {
    id: 'edge2-5',
    source: 'node2',
    target: 'node5',
    animated: false,
    type: 'smoothstep',
    style: { stroke: '#D3D3D3', strokeWidth: 1 },
    label: 'To Logic 5',
    labelStyle: { fill: '#000', fontSize: '12px' },
  },
  {
    id: 'edge2-4',
    source: 'node2',
    target: 'node4',
    animated: false,
    type: 'smoothstep',
    style: { stroke: '#D3D3D3', strokeWidth: 1 },
    label: 'To Func 4',
    labelStyle: { fill: '#000', fontSize: '12px' },
  },
  {
    id: 'edge2-3',
    source: 'node2',
    target: 'node3',
    animated: false,
    type: 'smoothstep',
    style: { stroke: '#D3D3D3', strokeWidth: 1 },
    label: 'To Func 3',
    labelStyle: { fill: '#000', fontSize: '12px' },
  },
  {
    id: 'edge5-6',
    source: 'node5',
    target: 'node6',
    animated: false,
    type: 'smoothstep',
    style: { stroke: '#D3D3D3', strokeWidth: 1 },
    label: 'Loop',
    labelStyle: { fill: '#000', fontSize: '12px' },
  },
  {
    id: 'edge8-9',
    source: 'node8',
    target: 'node9',
    animated: false,
    type: 'smoothstep',
    style: { stroke: '#D3D3D3', strokeWidth: 1 },
    label: 'To Main',
    labelStyle: { fill: '#000', fontSize: '12px' },
  },
  {
    id: 'edge9-10',
    source: 'node9',
    target: 'node10',
    animated: false,
    type: 'smoothstep',
    style: { stroke: '#D3D3D3', strokeWidth: 1 },
    label: 'To Result A',
    labelStyle: { fill: '#000', fontSize: '12px' },
  },
  {
    id: 'edge9-11',
    source: 'node9',
    target: 'node11',
    animated: false,
    type: 'smoothstep',
    style: { stroke: '#D3D3D3', strokeWidth: 1 },
    label: 'To Result B',
    labelStyle: { fill: '#000', fontSize: '12px' },
  },
  {
    id: 'edge3-8',
    source: 'node3',
    target: 'node8',
    animated: false,
    type: 'smoothstep',
    style: { stroke: '#D3D3D3', strokeWidth: 1 },
  },
];

export const order = [
  ['node1', '#FF0000'],  // Red
  ['edge1-2', '#FF0000'],  // Red
  ['node2', '#00FF00'],  // Green
  ['edge2-3', '#00FF00'],  // Green
  ['node3', '#0000FF'],  // Blue
  ['edge3-8', '#0000FF'],  // Blue
  ['node8', '#FFFF00'],  // Yellow
  ['edge8-9', '#FFFF00'],  // Yellow
  ['node9', '#FF00FF'],  // Magenta
  ['edge9-10', '#FF00FF'],  // Magenta
  ['node10', '#00FFFF'],  // Cyan
];
