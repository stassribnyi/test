import type { NodeTypes } from '@xyflow/react';

import { AppNode } from './types';
import InputLeftOutputRightNode from './UniversalNode';

export const DEFAULT_SIZE = {
  width: 150,
  height: 40,
  padding: 10,

  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  justifyContent: 'center',

  fontSize: '12px',
  backgroundColor: '#eee',

  color: "var(--xy-node-color, var(--xy-node-color-default))",
  border: "var(--xy-node-border, var(--xy-node-border-default))",
  borderRadius: "var(--xy-node-border-radius, var(--xy-node-border-radius-default))",
}

export const initialNodes: AppNode[] = [
  {
    id: 'a', type: 'input', position: { x: 0, y: 0 }, data: { label: 'wire' }, style: {
      ...DEFAULT_SIZE
    }
  },
  {
    id: 'b',
    position: { x: -100, y: 100 },
    data: { label: 'drag me!' },
    style: {
      ...DEFAULT_SIZE

    }
  },
  {
    id: 'c', position: { x: 100, y: 100 }, data: { label: 'your ideas' }, style: {
      ...DEFAULT_SIZE

    }
  },
  {
    id: 'd',
    position: { x: 0, y: 200 },
    data: { label: 'with React Flow' },
    style: {
      ...DEFAULT_SIZE
    }
  },
];

export const nodeTypes = {
  'universal-node': InputLeftOutputRightNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
