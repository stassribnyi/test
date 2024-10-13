import { memo } from 'react';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { type InputLeftOutputRightNode } from './types'

export default memo(function InputLeftOutputRightNode({ data }: NodeProps<InputLeftOutputRightNode>) {
    return (
        < >
            <Handle type="target" position={Position.Left} />
            {data.label && <div>{data.label}</div>}
            <Handle type='source' position={Position.Right} />
        </>
    );
});