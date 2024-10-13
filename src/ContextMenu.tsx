import React, { CSSProperties, useCallback } from "react";
import { useReactFlow } from "@xyflow/react";

const ContextMenu: React.FC<{
  id: string;
  top?: CSSProperties['top'];
  left?: CSSProperties['left'];
  right?: CSSProperties['right'];
  bottom?: CSSProperties['bottom'];
  onClick: () => void;
}> = ({ id, top, left, right, bottom, onClick }) => {
  const { setNodes, setEdges } = useReactFlow();

  const teamColorSelect = useCallback(
    (teamColor: string) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              style: {
                ...node.style,
                background: teamColor,
              },
            };
          }

          return node;
        })
      );
      setEdges((edges) =>
        edges.map((edge) => {
          if (edge.source === id) {
            return {
              ...edge,
              style: {
                ...edge.style,
                stroke: teamColor,
              },
              markerEnd: {
                // @ts-ignore
                ...edge.markerEnd,
                color: teamColor,
              },
            };
          }

          return edge;
        })
      );
    },
    [id, setNodes, setEdges]
  );

  return (
    <div
      style={{ top, left, right, bottom }}
      className="context-menu"
      onClick={onClick}
    >
      {/* <p style={{ margin: '0.5em' }}>
                <small>node: {id}</small>
            </p> */}
      <button onClick={() => teamColorSelect("#ffe5c0")}>team 1</button>
      <button onClick={() => teamColorSelect("#d2eeb0")}>team 2</button>
    </div>
  );
};

export default ContextMenu;
