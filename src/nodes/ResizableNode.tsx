import { memo, useState } from 'react';
import { Handle, Position, NodeResizer, NodeProps, useNodes, useReactFlow } from '@xyflow/react';
import { type ResizableNode } from './types'
import { DEFAULT_SIZE } from './index';

const SPACING = 4

export default memo(function ResizableNode({ data, id }: NodeProps<ResizableNode>) {
    const nodes = useNodes()
    const current = nodes.find(x => x.id === id)
    const [size, setSize] = useState(current ? { ...DEFAULT_SIZE, ...current.style } : DEFAULT_SIZE)
    const { updateNodeData } = useReactFlow();

    return (
        <>
            <NodeResizer handleStyle={{ borderRadius: '50%' }} minWidth={30} minHeight={30} onResize={(e, params) => {

                setSize((old) => ({ ...old, width: params.width, height: params.height }))
            }} />
            <Handle type='source' isConnectableStart isConnectableEnd position={Position.Top} style={{ opacity: 0 }} />
            <Handle type='source'  isConnectableStart isConnectableEnd position={Position.Left} style={{ opacity: 0 }} />
            <div style={{ backgroundColor: 'initial' }}>
                <textarea value={data.label} onChange={(evt) => updateNodeData(id, { label: evt.target.value })}
                    style={{
                        display: 'block',
                        boxSizing: 'border-box',
                        resize: 'none',
                        width: parseFloat(`${size.width}`) - SPACING, height: parseFloat(`${size.height}`) - SPACING
                    }} />
            </div>
            <Handle  type='source'  isConnectableStart isConnectableEnd position={Position.Bottom} style={{ opacity: 0 }} />
            <Handle  type='source'  isConnectableStart isConnectableEnd position={Position.Right} style={{ opacity: 0 }} />
        </>
    );
});