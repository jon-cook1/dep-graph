// Nodes with circular shapes and adjusted manual positioning for your specified layout
export const initialNodes = [
  // Input nodes
  {
    id: 'node1',
    type: 'custominput',
    data: { label: 'side_length' },
    position: { x: 100, y: 100 },  // Leftmost node
  },
  {
    id: 'node2',
    type: 'custominput',
    data: { label: 'plant_spacing' },
    position: { x: 250, y: 100 },  // Next to side_length
  },
  {
    id: 'node3',
    type: 'custominput',
    data: { label: 'soil_depth' },
    position: { x: 400, y: 100 },  // Next to plant_spacing
  },
  {
    id: 'node4',
    type: 'custominput',
    data: { label: 'fill_depth' },
    position: { x: 550, y: 100 },  // Next to soil_depth
  },

  // Step node
  {
    id: 'node10',
    type: 'custominput',
    data: { label: 'pi' },
    position: { x: -50, y: 250 },  // Directly under side_length
  },

  // Target node
  {
    id: 'node13',
    type: 'target',
    data: { label: 'circle_area' },
    position: { x: 100, y: 250 },  // Next to pi
  },

  // Output nodes (next row)
  {
    id: 'node5',
    type: 'customoutput',
    data: { label: 'circle_plants' },
    position: { x: 100, y: 400 },  // Under pi
  },
  {
    id: 'node6',
    type: 'customoutput',
    data: { label: 'semi_plants' },
    position: { x: 250, y: 400 },  // Under circle_area
  },
  {
    id: 'node11',
    type: 'step',
    data: { label: 'circle_soil' },
    position: { x: 400, y: 400 },  // Under space between inputs
  },
  {
    id: 'node12',
    type: 'step',
    data: { label: 'fill_area' },
    position: { x: 550, y: 400 },  // Under fill_depth
  },

  // Final output nodes (bottom row)
  {
    id: 'node7',
    type: 'customoutput',
    data: { label: 'total_plants' },
    position: { x: 175, y: 550 },  // Under circle_plants and semi_plants
  },
  {
    id: 'node8',
    type: 'customoutput',
    data: { label: 'total_soil' },
    position: { x: 400, y: 550 },  // Under circle_soil
  },
  {
    id: 'node9',
    type: 'customoutput',
    data: { label: 'total_fill' },
    position: { x: 550, y: 550 },  // Under fill_area
  },
];

export const initialEdges = [
  // Internal edges
  {
    id: 'edge10-13',
    source: 'node10',
    target: 'node13',
    type:  "internal",
  },
  {
    id: 'edge5-7',
    source: 'node5',
    target: 'node7',
  },
  {
    id: 'edge6-7',
    source: 'node6',
    target: 'node7',
    type:  "internal",
  },
  {
    id: 'edge11-8',
    source: 'node11',
    target: 'node8',
    type:  "internal",
  },
  {
    id: 'edge12-9',
    source: 'node12',
    target: 'node9',
    type:  "internal",
  },

  // Passing edges
  {
    id: 'edge1-13',
    source: 'node1',
    target: 'node13',
    type:  "internal",
  },
  {
    id: 'edge1-12',
    source: 'node1',
    target: 'node12',
    type:  "internal",
  },
  {
    id: 'edge2-5',
    source: 'node2',
    target: 'node5',
    type:  "internal",
  },
  {
    id: 'edge2-6',
    source: 'node2',
    target: 'node6',
    type:  "internal",
  },
  {
    id: 'edge3-11',
    source: 'node3',
    target: 'node11',
    type:  "internal",
  },
  {
    id: 'edge4-12',
    source: 'node4',
    target: 'node12',
    type:  "internal",
  },
  {
    id: 'edge13-5',
    source: 'node13',
    target: 'node5',
    type:  "internal",
  },
  {
    id: 'edge13-6',
    source: 'node13',
    target: 'node6',
    type:  "internal",
  },
  {
    id: 'edge13-11',
    source: 'node13',
    target: 'node11',
    type:  "internal",
  },
  {
    id: 'edge13-12',
    source: 'node13',
    target: 'node12',
    type:  "internal",
  },
];

// Animation order remains unchanged
export const order = [

  ['node7', '#FFFF00'],  // total_plants (Yellow)
  ['edge5-7', '#FFFF00'],  // circle_plants -> total_plants (Yellow)
  ['node5', '#FFFF00'],  // circle_plants (Yellow)
  ['edge6-7', '#FFFF00'],  // semi_plants -> total_plants (Yellow)
  ['node6', '#FFFF00'],  // semi_plants (Yellow)
  ['edge13-5', '#FFFF00'],
  ['edge13-6', '#FFFF00'],

  ['node13', '#FFFF00'],  // circle_area (Yellow)
  ['edge10-13', '#FFFF00'],  // pi -> circle_area (Yellow)
  ['node10', '#FFFF00'],  // pi (Yellow)

  ['node8', '#0000FF'],  // total_soil (Blue)
  ['edge11-8', '#0000FF'],  // circle_soil -> total_soil (Blue)
  ['node11', '#0000FF'],  // circle_soil (Blue)
  ['edge13-11', '#0000FF'],

  ['node13', '#FF0000'],  // circle_area Red
  ['edge10-13', '#FF0000'],  // pi -> circle_area (Red)
  ['node10', '#FF0000'],  // pi (Red)

  ['edge13-5', '#000000'],
  ['edge13-6', '#000000'],
  ['edge13-11', '#000000'],

  ['node9', '#00FF00'],  // total_fill (Green)
  ['edge12-9', '#00FF00'],  // fill_area -> total_fill (Green)
  ['node12', '#00FF00'],  // fill_area (Green)
  ['edge13-12', '#00FF00'],
  ['edge13-12', '#000000'],


  ['node13', '#FF0000'],  // circle_area (Red)
  ['edge10-13', '#FF0000'],  // pi -> circle_area (Red)
  ['node10', '#FF0000'],  // pi (Red)
];
