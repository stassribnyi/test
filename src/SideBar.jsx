import React from 'react';
import { useDnD } from './DnDContext';

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType, variant) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData("text/plain", variant);
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'universal-node', 'top')} draggable>
        Input Node
      </div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'universal-node')} draggable>
        Blank Node
      </div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'universal-node', 'left-right')} draggable>
        Input left output right
      </div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'universal-node', 'right-left')} draggable>
        Input right output left
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'universal-node', 'top-bottom')} draggable>
        Default Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'universal-node', 'bottom')} draggable>
        Output Node
      </div>
    </aside>
  );
};
