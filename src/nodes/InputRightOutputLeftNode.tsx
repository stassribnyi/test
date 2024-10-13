import { memo } from 'react';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { type InputRightOutputLeftNode } from './types'

export default memo(function InputRightOutputLeftNode({ data }: NodeProps<InputRightOutputLeftNode>) {
    return (
        <>
            <Handle type="target" position={Position.Right} />
            {data.label && <div>{data.label}</div>}
            <Handle type='source' position={Position.Left} />
        </>
    );
});