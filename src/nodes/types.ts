import type { Node, BuiltInNode } from "@xyflow/react";

export type ResizableNode = Node<{ label: string }, "resizable-node">;
export type BlankNode = Node<{ label: string }, "blank-node">;
export type InputRightOutputLeftNode = Node<
  {
    label: string;
    edit?: boolean;
    variant?:
      | "left-right"
      | "right-left"
      | "top-bottom"
      | "bottom-top"
      | "blank";
  },
  "input-right-output-left-node"
>;
export type UniversalNode = Node<
  {
    label: string;
    edit?: boolean;
    variant?:
      | "left-right"
      | "right-left"
      | "top-bottom"
      | "bottom-top"
      | "bottom"
      | "top"
      | "blank";
  },
  "universal-node"
>;

export type AppNode = {
  prevType?:
    | BuiltInNode["type"]
    | ResizableNode["type"]
    | BlankNode["type"]
    | InputRightOutputLeftNode["type"]
    | UniversalNode["type"];
} & (
  | BlankNode
  | BuiltInNode
  | InputRightOutputLeftNode
  | UniversalNode
  | ResizableNode
);
