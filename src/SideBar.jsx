import React from "react";
import { useDnD } from "./DnDContext";

const VARIANTS = [
  { variant: "blank", label: "No In/Out (Blank)" },
  { variant: "top", label: "Top In" },
  { variant: "bottom", label: "Bottom Out" },
  { variant: "top-bottom", label: "Top In Bottom Out" },
  { variant: "left-right", label: "Left In Right Out" },
  { variant: "right-left", label: "Right In Left Out" },
];

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, variant) => {
    setType("universal-node");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", variant);
  };

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      {VARIANTS.map(({ variant, label }) => (
        <div
          draggable
          key={variant}
          className="dndnode"
          onDragStart={(event) => onDragStart(event, variant)}
        >
          {label}
        </div>
      ))}
    </aside>
  );
};
