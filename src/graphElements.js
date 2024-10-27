const position = { x: 0, y: 0 };

export const initialNodes = [
  // Input nodes
  {
    id: 'node1',
    type: 'input',
    data: { label: 'side_length' },
    position,
  },
  {
    id: 'node2',
    type: 'input',
    data: { label: 'plant_spacing' },
    position,
  },
  {
    id: 'node3',
    type: 'input',
    data: { label: 'soil_depth' },
    position,
  },
  {
    id: 'node4',
    type: 'input',
    data: { label: 'fill_depth' },
    position,
  },
  
  // Output nodes
  {
    id: 'node5',
    type: 'output',
    data: { label: 'circle_plants' },
    position,
  },
  {
    id: 'node6',
    type: 'output',
    data: { label: 'semi_plants' },
    position,
  },
  {
    id: 'node7',
    type: 'output',
    data: { label: 'total_plants' },
    position,
  },
  {
    id: 'node8',
    type: 'output',
    data: { label: 'total_soil' },
    position,
  },
  {
    id: 'node9',
    type: 'output',
    data: { label: 'total_fill' },
    position,
  },

  // Step nodes
  {
    id: 'node10',
    type: 'step',
    data: { label: 'pi' },
    position,
  },
  {
    id: 'node11',
    type: 'step',
    data: { label: 'circle_soil' },
    position,
  },
  {
    id: 'node12',
    type: 'step',
    data: { label: 'fill_area' },
    position,
  },

  // Target node
  {
    id: 'node13',
    type: 'target',
    data: { label: 'circle_area' },
    position,
  },
];

export const initialEdges = [
  // Internal edges
  {
    id: 'edge10-13',
    source: 'node10',
    target: 'node13',
    type: 'straight',
    style: { stroke: '#00FFCC', strokeWidth: 2 }, // Internal
  },
  {
    id: 'edge5-7',
    source: 'node5',
    target: 'node7',
    type: 'straight',
    style: { stroke: '#00FFCC', strokeWidth: 2 }, // Internal
  },
  {
    id: 'edge6-7',
    source: 'node6',
    target: 'node7',
    type: 'straight',
    style: { stroke: '#00FFCC', strokeWidth: 2 }, // Internal
  },
  {
    id: 'edge11-8',
    source: 'node11',
    target: 'node8',
    type: 'straight',
    style: { stroke: '#00FFCC', strokeWidth: 2 }, // Internal
  },
  {
    id: 'edge12-9',
    source: 'node12',
    target: 'node9',
    type: 'straight',
    style: { stroke: '#00FFCC', strokeWidth: 2 }, // Internal
  },

  // Passing edges
  {
    id: 'edge1-13',
    source: 'node1',
    target: 'node13',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing
  },
  {
    id: 'edge1-12',
    source: 'node1',
    target: 'node12',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing
  },
  {
    id: 'edge2-5',
    source: 'node2',
    target: 'node5',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing
  },
  {
    id: 'edge2-6',
    source: 'node2',
    target: 'node6',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing
  },
  {
    id: 'edge3-11',
    source: 'node3',
    target: 'node11',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing
  },
  {
    id: 'edge4-12',
    source: 'node4',
    target: 'node12',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing
  },
  {
    id: 'edge13-5',
    source: 'node13',
    target: 'node5',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing
  },
  {
    id: 'edge13-6',
    source: 'node13',
    target: 'node6',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing
  },
  {
    id: 'edge13-11',
    source: 'node13',
    target: 'node11',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing
  },
];

export const order = [
  ['node1', '#FF0000'],  // Red
  ['edge1-13', '#FF0000'],  // Red
  ['node13', '#00FF00'],  // Green
  ['edge13-5', '#00FF00'],  // Green
  ['node5', '#0000FF'],  // Blue
  ['edge5-7', '#0000FF'],  // Blue
  ['node7', '#FFFF00'],  // Yellow
  ['edge13-6', '#FFFF00'],  // Yellow
  ['node6', '#FF00FF'],  // Magenta
  ['edge13-11', '#FF00FF'],  // Magenta
  ['node11', '#00FFFF'],  // Cyan
];
