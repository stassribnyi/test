import React from 'react';
import { useDnD } from './DnDContext';

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'blank-node')} draggable>
        Blank Node
      </div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input-left-output-right-node')} draggable>
        Input left output right
      </div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input-right-output-left-node')} draggable>
        Input right output left
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
    </aside>
  );
};
