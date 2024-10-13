import type { Node, BuiltInNode } from '@xyflow/react';

export type ResizableNode = Node<{ label: string }, 'resizable-node'>;
export type BlankNode = Node<{ label: string }, 'blank-node'>;
export type InputRightOutputLeftNode = Node<{ label: string }, 'input-right-output-left-node'>;
export type InputLeftOutputRightNode = Node<{ label: string }, 'input-left-output-right-node'>;

export type AppNode = {
    prevType?: (BuiltInNode['type'] | ResizableNode['type'] | BlankNode['type']| InputRightOutputLeftNode['type']| InputLeftOutputRightNode['type'])
} & (
    | BlankNode
    | BuiltInNode
    | InputRightOutputLeftNode
    | InputLeftOutputRightNode
    | ResizableNode
);
