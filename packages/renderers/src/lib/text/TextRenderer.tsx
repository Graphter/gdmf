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
    value={internalData}
    onChange={(e) => {
      setInternalData(e.currentTarget.value)
    }}
    />
}
