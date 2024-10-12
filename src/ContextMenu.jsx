import React, { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';

export default function ContextMenu({
    id,
    top,
    left,
    right,
    bottom,
    ...props
}) {
    const {  setNodes, setEdges } = useReactFlow();

    const teamColorSelect = useCallback((teamColor) => {
        setNodes((nodes) => nodes.map((node) => {
            if (node.id === id) {
                return {
                    ...node,
                    style: {
                        ...node.style,
                        background: teamColor
                    }
                }
            }

            return node
        }));
        setEdges((edges) => edges.map((edge) => {
            if (edge.source === id) {
                return {
                    ...edge,
                    style: {
                        ...edge.style,
                        stroke: teamColor
                    }, markerEnd: {
                        ...edge.markerEnd,
                        color: teamColor
                    }
                }
            }

            return edge
        }));
    }, [id, setNodes, setEdges]);

    return (
        <div
            style={{ top, left, right, bottom }}
            className="context-menu"
            {...props}
        >
            {/* <p style={{ margin: '0.5em' }}>
                <small>node: {id}</small>
            </p> */}
            <button onClick={() => teamColorSelect('#ffe5c0')}>team 1</button>
            <button onClick={() => teamColorSelect('#d2eeb0')}>team 2</button>
        </div>
    );
}