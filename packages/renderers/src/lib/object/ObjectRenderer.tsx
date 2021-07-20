import { ComponentType } from 'react';
import { isObjectNodeConfig } from './isObjectNodeConfig';
import { DefaultNodeRenderer, NodeRendererProps, pathToKey, useNodeState } from '@gdmf/ui-core';

export const ObjectRenderer: ComponentType<NodeRendererProps> = (
  {
    path,
    config,
    parentLayer
  }
) => {
  isObjectNodeConfig(config)
  const { childMetas } = useNodeState(path, config)

  return <>
    {childMetas.map(childMeta => (
      <div key={pathToKey(childMeta.path)}>
        <div>{childMeta.config.id}</div>
        <DefaultNodeRenderer nodeMeta={childMeta} parentLayer={parentLayer} />
      </div>
    ))}
  </>
}
