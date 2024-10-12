import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { type BlankeNode } from './types'

export default memo(function BlankeNode({ data }: NodeProps<BlankeNode>) {
    return (
        < >
            {data.label && <div>{data.label}</div>}
        </>
    );
});