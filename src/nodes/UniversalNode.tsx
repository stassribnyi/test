import { memo, useState } from "react";
import {
  Handle,
  NodeProps,
  NodeResizer,
  Position,
  useNodes,
  useReactFlow,
} from "@xyflow/react";
import { type UniversalNode } from "./types";
import { DEFAULT_SIZE } from "./index";

const SPACING = 4;

const NodeHandles: React.FC<{
  variant: NodeProps<UniversalNode>["data"]["variant"];
}> = ({ variant }) => {
  switch (variant) {
    case "left-right":
      return (
        <>
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </>
      );
    case "right-left":
      return (
        <>
          <Handle type="target" position={Position.Right} />
          <Handle type="source" position={Position.Left} />
        </>
      );
    case "top-bottom":
      return (
        <>
          <Handle type="target" position={Position.Top} />
          <Handle type="source" position={Position.Bottom} />
        </>
      );
    case "bottom-top":
      return (
        <>
          <Handle type="target" position={Position.Bottom} />
          <Handle type="source" position={Position.Top} />
        </>
      );
    case "top":
      return (
        <>
          <Handle type="target" position={Position.Top} />
        </>
      );
    case "bottom":
      return (
        <>
          <Handle type="source" position={Position.Bottom} />
        </>
      );
    case "blank":
    default:
      return null;
  }
};

export default memo(function UniversalNode({
  data: { label, edit, variant },
  id,
}: NodeProps<UniversalNode>) {
  const nodes = useNodes();
  const current = nodes.find((x) => x.id === id);
  const [size, setSize] = useState(
    current ? { ...DEFAULT_SIZE, ...current.style } : DEFAULT_SIZE
  );
  const { updateNodeData } = useReactFlow();

  return (
    <>
      {edit ? (
        <NodeResizer
          handleStyle={{ borderRadius: "50%" }}
          minWidth={30}
          minHeight={30}
          onResize={(e, params) => {
            setSize((old) => ({
              ...old,
              width: params.width,
              height: params.height,
            }));
          }}
        />
      ) : null}
      {edit ? (
        <div style={{ backgroundColor: "initial" }}>
          <textarea
            value={label}
            onChange={(evt) => updateNodeData(id, { label: evt.target.value })}
            style={{
              display: "block",
              boxSizing: "border-box",
              resize: "none",
              width: parseFloat(`${size.width}`) - SPACING,
              height: parseFloat(`${size.height}`) - SPACING,
            }}
          />
        </div>
      ) : (
        <div>{label}</div>
      )}
      <NodeHandles variant={variant} />
    </>
  );
});
