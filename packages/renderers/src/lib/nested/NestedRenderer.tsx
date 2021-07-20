import { isNestedNodeConfig } from './isNestedNodeConfig';
import { ComponentType } from 'react';
import { DefaultNodeRenderer, NodeRendererProps, useNodeState } from '@gdmf/ui-core';

export const NestedRenderer: ComponentType<NodeRendererProps> = (
  {
    path,
    config
  }
) => {
  isNestedNodeConfig(config)
  const { childMetas, layer } = useNodeState(path, config)
  if(!childMetas.length) return null
  const nestedChildMeta = childMetas[0]
  return <>
    <DefaultNodeRenderer nodeMeta={nestedChildMeta} parentLayer={layer} />
  </>
}
