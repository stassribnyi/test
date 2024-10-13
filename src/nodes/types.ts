import type { Node, BuiltInNode } from "@xyflow/react";

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
  prevType?: BuiltInNode["type"] | UniversalNode["type"];
} & (BuiltInNode | UniversalNode);
