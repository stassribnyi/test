import { CSSProperties } from "react";
import type { NodeTypes } from "@xyflow/react";

import { AppNode } from "./types";
import InputLeftOutputRightNode from "./UniversalNode";

export const DEFAULT_SIZE: CSSProperties = {
  width: 150,
  height: 40,
  padding: 10,

  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  justifyContent: "center",

  fontSize: "12px",
  backgroundColor: "#eee",

  color: "var(--xy-node-color, var(--xy-node-color-default))",
  border: "var(--xy-node-border, var(--xy-node-border-default))",
  borderRadius:
    "var(--xy-node-border-radius, var(--xy-node-border-radius-default))",
};

export const initialNodes: AppNode[] = [
  {
    id: "a",
    type: "universal-node",
    position: { x: 0, y: 0 },
    data: { label: "wire", variant: 'bottom' },
    style: {
      ...DEFAULT_SIZE,
    },
  },
  {
    id: "b",
    type: "universal-node",
    position: { x: -100, y: 100 },
    data: { label: "drag me!", variant: 'top-bottom' },
    style: {
      ...DEFAULT_SIZE,
    },
  },
  {
    id: "c",
    type: "universal-node",
    position: { x: 100, y: 100 },
    data: { label: "your ideas", variant: 'top-bottom' },
    style: {
      ...DEFAULT_SIZE,
    },
  },
  {
    id: "d",
    type: "universal-node",
    position: { x: 0, y: 200 },
    data: { label: "with React Flow", variant: 'top' },
    style: {
      ...DEFAULT_SIZE,
    },
  },
];

export const nodeTypes = {
  "universal-node": InputLeftOutputRightNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
