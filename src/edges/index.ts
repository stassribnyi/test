import { ConnectionLineType, MarkerType, type Edge, type EdgeTypes } from '@xyflow/react';


export const DEFAULT_EDGE: Partial<Edge> = {
  type: ConnectionLineType.SmoothStep,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 16,
    height: 16,
  },
  style: {
    strokeWidth: 2,
  },
  // label: 'to do'
}
export const initialEdges: Edge[] = [
  { id: 'a->c', source: 'a', target: 'c', ...DEFAULT_EDGE },
  { id: 'b->d', source: 'b', target: 'd', ...DEFAULT_EDGE },
  { id: 'c->d', source: 'c', target: 'd', ...DEFAULT_EDGE },
];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
