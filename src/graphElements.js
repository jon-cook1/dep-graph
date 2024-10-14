import React from 'react';

const position = { x: 0, y: 0 };

export const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input' },
  },
  {
    id: '2',
    data: { label: 'node 2 ' },
  },
  {
    id: '2a',
    data: { label: 'node 2a ' },
  },
  {
    id: '2b',
    data: { label: 'node 2b ' },
  },
  {
    id: '2c',
    data: { label: 'node 2c ' },
  },
  {
    id: '2d',
    data: { label: 'node 2d ' },
  },
  {
    id: '3',
    data: { label: 'node 3 ' },
  },
  {
    id: '4',
    data: { label: 'node 4 ' },
  },
  {
    id: '5',
    data: { label: 'node 5 ' },
  },
  {
    id: '6',
    type: 'output',
    data: { label: 'output' },
  },
  {
    id: '7',
    type: 'output',
    data: { label: 'output' },
  },
];

export const initialEdges = [
  { id: 'e12', source: '1', target: '2', animated: true},
  { id: 'e13', source: '1', target: '3', animated: true },
  { id: 'e22a', source: '2', target: '2a', animated: true },
  { id: 'e22b', source: '2', target: '2b', animated: true },
  { id: 'e22c', source: '2', target: '2c', animated: true },
  { id: 'e2c2d', source: '2c', target: '2d', animated: true },
  { id: 'e45', source: '4', target: '5', animated: true },
  { id: 'e56', source: '5', target: '6', animated: true },
  { id: 'e57', source: '5', target: '7', animated: true },
];
