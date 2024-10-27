// Nodes with circular shapes and adjusted manual positioning for your specified layout
export const initialNodes = [
  // Input nodes
  {
    id: 'node1',
    type: 'custominput',
    data: { label: 'side_length' },
    position: { x: 100, y: 100 },  // Leftmost node
    style: { borderRadius: '50%', width: 100, height: 100 },  // Circular shape
  },
  {
    id: 'node2',
    type: 'custominput',
    data: { label: 'plant_spacing' },
    position: { x: 250, y: 100 },  // Next to side_length
    style: { borderRadius: '50%', width: 100, height: 100 },  // Circular shape
  },
  {
    id: 'node3',
    type: 'custominput',
    data: { label: 'soil_depth' },
    position: { x: 400, y: 100 },  // Next to plant_spacing
    style: { borderRadius: '50%', width: 100, height: 100 },  // Circular shape
  },
  {
    id: 'node4',
    type: 'custominput',
    data: { label: 'fill_depth' },
    position: { x: 550, y: 100 },  // Next to soil_depth
    style: { borderRadius: '50%', width: 100, height: 100 },  // Circular shape
  },

  // Step node
  {
    id: 'node10',
    type: 'custominput',
    data: { label: 'pi' },
    position: { x: -50, y: 250 },  // Directly under side_length
    style: { borderRadius: '50%', width: 100, height: 100 },  // Circular shape
    sourcePosition: 'right',  // pi connects from right
  },

  // Target node
  {
    id: 'node13',
    type: 'target',
    data: { label: 'circle_area' },
    position: { x: 100, y: 250 },  // Next to pi
    style: { borderRadius: '50%', width: 100, height: 100 },  // Circular shape
    targetPosition: 'left',  // circle_area connects to the left side
  },

  // Output nodes (next row)
  {
    id: 'node5',
    type: 'customoutput',
    data: { label: 'circle_plants' },
    position: { x: 100, y: 400 },  // Under pi
    style: { borderRadius: '50%', width: 100, height: 100 },  // Circular shape
  },
  {
    id: 'node6',
    type: 'customoutput',
    data: { label: 'semi_plants' },
    position: { x: 250, y: 400 },  // Under circle_area
    style: { borderRadius: '50%', width: 100, height: 100 },  // Circular shape
  },
  {
    id: 'node11',
    type: 'step',
    data: { label: 'circle_soil' },
    position: { x: 400, y: 400 },  // Under space between inputs
    style: { borderRadius: '50%', width: 100, height: 100 },  // Circular shape
  },
  {
    id: 'node12',
    type: 'step',
    data: { label: 'fill_area' },
    position: { x: 550, y: 400 },  // Under fill_depth
    style: { borderRadius: '50%', width: 100, height: 100 },  // Circular shape
  },

  // Final output nodes (bottom row)
  {
    id: 'node7',
    type: 'customoutput',
    data: { label: 'total_plants' },
    position: { x: 175, y: 550 },  // Under circle_plants and semi_plants
    style: { borderRadius: '50%', width: 100, height: 100 },  // Circular shape
  },
  {
    id: 'node8',
    type: 'customoutput',
    data: { label: 'total_soil' },
    position: { x: 400, y: 550 },  // Under circle_soil
    style: { borderRadius: '50%', width: 100, height: 100 },  // Circular shape
  },
  {
    id: 'node9',
    type: 'customoutput',
    data: { label: 'total_fill' },
    position: { x: 550, y: 550 },  // Under fill_area
    style: { borderRadius: '50%', width: 100, height: 100 },  // Circular shape
  },
];

export const initialEdges = [
  // Internal edges
  {
    id: 'edge10-13',
    source: 'node10',
    target: 'node13',
    type: 'straight',
    sourceHandle: 'right',
    targetHandle: 'left',
    style: { stroke: '#00FFCC', strokeWidth: 2 }, // Internal (pi -> circle_area)
  },
  {
    id: 'edge5-7',
    source: 'node5',
    target: 'node7',
    type: 'straight',
    style: { stroke: '#00FFCC', strokeWidth: 2 }, // Internal (circle_plants -> total_plants)
  },
  {
    id: 'edge6-7',
    source: 'node6',
    target: 'node7',
    type: 'straight',
    style: { stroke: '#00FFCC', strokeWidth: 2 }, // Internal (semi_plants -> total_plants)
  },
  {
    id: 'edge11-8',
    source: 'node11',
    target: 'node8',
    type: 'straight',
    style: { stroke: '#00FFCC', strokeWidth: 2 }, // Internal (circle_soil -> total_soil)
  },
  {
    id: 'edge12-9',
    source: 'node12',
    target: 'node9',
    type: 'straight',
    style: { stroke: '#00FFCC', strokeWidth: 2 }, // Internal (fill_area -> total_fill)
  },

  // Passing edges
  {
    id: 'edge1-13',
    source: 'node1',
    target: 'node13',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing (side_length -> circle_area)
  },
  {
    id: 'edge1-12',
    source: 'node1',
    target: 'node12',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing (side_length -> fill_area)
  },
  {
    id: 'edge2-5',
    source: 'node2',
    target: 'node5',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing (plant_spacing -> circle_plants)
  },
  {
    id: 'edge2-6',
    source: 'node2',
    target: 'node6',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing (plant_spacing -> semi_plants)
  },
  {
    id: 'edge3-11',
    source: 'node3',
    target: 'node11',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing (soil_depth -> circle_soil)
  },
  {
    id: 'edge4-12',
    source: 'node4',
    target: 'node12',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing (fill_depth -> fill_area)
  },
  {
    id: 'edge13-5',
    source: 'node13',
    target: 'node5',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing (circle_area -> circle_plants)
  },
  {
    id: 'edge13-6',
    source: 'node13',
    target: 'node6',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing (circle_area -> semi_plants)
  },
  {
    id: 'edge13-11',
    source: 'node13',
    target: 'node11',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing (circle_area -> circle_soil)
  },
  {
    id: 'edge13-12',
    source: 'node13',
    target: 'node12',
    type: 'straight',
    style: { stroke: '#FF9900', strokeWidth: 3 }, // Passing (circle_area -> total_fill)
  },
];

// Animation order remains unchanged
export const order = [
  ['node10', '#FF0000'],  // pi (Red)
  ['edge10-13', '#FF0000'],  // pi -> circle_area (Red)
  ['node13', '#FF0000'],  // circle_area (Red)

  ['node7', '#FFFF00'],  // total_plants (Yellow)
  ['edge5-7', '#FFFF00'],  // circle_plants -> total_plants (Yellow)
  ['node5', '#FFFF00'],  // circle_plants (Yellow)
  ['edge6-7', '#FFFF00'],  // semi_plants -> total_plants (Yellow)
  ['node6', '#FFFF00'],  // semi_plants (Yellow)
  ['edge13-5', '#FFFF00'],
  ['edge13-6', '#FFFF00'],

  ['node13', '#FF9900'],  // circle_area (Orange)

  ['node8', '#0000FF'],  // total_soil (Blue)
  ['edge11-8', '#0000FF'],  // circle_soil -> total_soil (Blue)
  ['node11', '#0000FF'],  // circle_soil (Blue)
  ['edge13-11', '#0000FF'],
  ['node13', '#804D80'],  // circle_area (Blue/Orange combined)

  ['node9', '#00FF00'],  // total_fill (Green)
  ['edge12-9', '#00FF00'],  // fill_area -> total_fill (Green)
  ['node12', '#00FF00'],  // fill_area (Green)
  ['edge13-12', '#00FF00'],

  ['node13', '#408040'],  // circle_area (Blue/Orange/Green combined)
];
