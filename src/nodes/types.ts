import type { Node, BuiltInNode } from '@xyflow/react';

export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type ResizableNode = Node<{ label: string }, 'resizable-node'>;
export type BlankeNode = Node<{ label: string }, 'blank-node'>;
export type AppNode = { prevType?: (BuiltInNode['type'] | PositionLoggerNode['type'] | ResizableNode['type'] | BlankeNode['type']) } & (BlankeNode | BuiltInNode | PositionLoggerNode | ResizableNode);
