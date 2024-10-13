import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { type BlankNode } from './types'

export default memo(function BlankNode({ data }: NodeProps<BlankNode>) {
    return (
        < >
            {data.label && <div>{data.label}</div>}
        </>
    );
});