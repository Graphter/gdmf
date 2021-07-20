import { ComponentType } from 'react';
import { NodeRendererProps, useNodeState } from '@gdmf/ui-core';

export const TextRenderer: ComponentType<NodeRendererProps> = (
  {
    path,
    config,
  }
) => {
  const { internalData, setInternalData } = useNodeState(path, config)
  return <input
    type='text'
    className='flex-grow p-3 rounded'
    value={internalData}
    onChange={(e) => {
      setInternalData(e.currentTarget.value)
    }}
    />
}
