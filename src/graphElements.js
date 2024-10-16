import React from 'react';

const position = { x: 0, y: 0 };

export const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input: Student Code' },
    position,
    style: {
      background: '#FF5733',
      color: '#fff',
      border: '2px solid #C70039',
      borderRadius: '10px',
      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
      fontSize: '14px',
      padding: '10px',
    },
  },
  {
    id: '2',
    data: { label: 'Decomposition Node 2' },
    position,
    style: {
      background: '#33FF57',
      color: '#000',
      border: '2px dashed #28A745',
      borderRadius: '15px',
      padding: '10px',
      fontSize: '12px',
      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
    },
  },
  {
    id: '2a',
    data: { label: 'Function 2a' },
    position,
    style: {
      background: '#33FFF6',
      color: '#000',
      border: '2px solid #17A2B8',
      borderRadius: '50%',
      padding: '5px',
      fontSize: '10px',
      textAlign: 'center',
    },
  },
  {
    id: '2b',
    data: { label: 'Function 2b' },
    position,
    style: {
      background: '#FFC300',
      color: '#000',
      border: '3px double #FF5733',
      borderRadius: '5px',
      padding: '10px',
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
    },
  },
  {
    id: '2c',
    data: { label: 'Conditional Logic 2c' },
    position,
    style: {
      background: '#DAF7A6',
      color: '#000',
      border: '2px solid #C70039',
      borderRadius: '0px',
      padding: '10px',
      fontStyle: 'italic',
    },
  },
  {
    id: '2d',
    data: { label: 'Loop 2d' },
    position,
    style: {
      background: '#FF33F6',
      color: '#fff',
      border: '2px solid #C70039',
      borderRadius: '15px',
      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
      fontSize: '12px',
    },
  },
  {
    id: '3',
    data: { label: 'Intermediate Node 3' },
    position,
    style: {
      background: '#FFBD33',
      color: '#000',
      border: '2px solid #FF5733',
      borderRadius: '10px',
      padding: '10px',
      fontWeight: 'bold',
    },
  },
  {
    id: '4',
    data: { label: 'Helper Function Node 4' },
    position,
    style: {
      background: '#8D33FF',
      color: '#fff',
      border: '2px solid #6F42C1',
      borderRadius: '10px',
      textAlign: 'center',
      fontSize: '12px',
    },
  },
  {
    id: '5',
    data: { label: 'Main Processing 5' },
    position,
    style: {
      background: '#FF3386',
      color: '#fff',
      border: '2px solid #D63384',
      borderRadius: '20px',
      padding: '10px',
      fontSize: '14px',
    },
  },
  {
    id: '6',
    type: 'output',
    data: { label: 'Output: Result A' },
    position,
    style: {
      background: '#33FFBD',
      color: '#000',
      border: '2px solid #20C997',
      borderRadius: '10px',
      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
      fontSize: '14px',
    },
  },
  {
    id: '7',
    type: 'output',
    data: { label: 'Output: Result B' },
    position,
    style: {
      background: '#FF5733',
      color: '#fff',
      border: '2px solid #C70039',
      borderRadius: '10px',
      padding: '10px',
      fontSize: '14px',
    },
  },
];

export const initialEdges = [
  {
    id: 'e12',
    source: '1',
    target: '2',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#FF5733', strokeWidth: 2 },
    label: 'Input to Decomposition',
    labelStyle: { fill: '#FF5733', fontWeight: 'bold' },
  },
  {
    id: 'e13',
    source: '1',
    target: '3',
    animated: true,
    type: 'step',
    style: { stroke: '#33FF57', strokeWidth: 2, strokeDasharray: '5 5' },
    label: 'Input to Intermediate',
    labelStyle: { fill: '#33FF57', fontSize: '10px' },
  },
  {
    id: 'e22a',
    source: '2',
    target: '2a',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#33FFF6', strokeWidth: 7 },
    label: 'Breakdown to Function 2a',
    labelStyle: { fill: '#33FFF6', fontStyle: 'italic' },
  },
  {
    id: 'e22b',
    source: '2',
    target: '2b',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#FFC300', strokeWidth: 2, strokeDasharray: '2 4' },
    label: 'Breakdown to Function 2b',
    labelStyle: { fill: '#FFC300', fontWeight: 'bold' },
  },
  {
    id: 'e22c',
    source: '2',
    target: '2c',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#DAF7A6', strokeWidth: 2 },
    label: 'Logic Connection',
    labelStyle: { fill: '#000', fontSize: '10px' },
  },
  {
    id: 'e2c2d',
    source: '2c',
    target: '2d',
    animated: true,
    type: 'straight',
    style: { stroke: '#FF33F6', strokeWidth: 7 },
    label: 'Loop Iteration',
    labelStyle: { fill: '#FF33F6', fontWeight: 'bold' },
  },
  {
    id: 'e45',
    source: '4',
    target: '5',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#8D33FF', strokeWidth: 2 },
    label: 'Helper to Main',
    labelStyle: { fill: '#8D33FF', fontSize: '10px' },
  },
  {
    id: 'e56',
    source: '5',
    target: '6',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#33FFBD', strokeWidth: 2 },
    label: 'Process to Result A',
    labelStyle: { fill: '#33FFBD' },
  },
  {
    id: 'e57',
    source: '5',
    target: '7',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#FF5733', strokeWidth: 2 },
    label: 'Process to Result B',
    labelStyle: { fill: '#FF5733' },
  },
  {
    id: 'connector',
    source: '2a',
    target: '4',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#FF5733', strokeWidth: 1 },
  },
];
