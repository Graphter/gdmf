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
    {childMetas.map((childMeta, i) => {
      const property = config.properties[i]
      const childPathKey = pathToKey(childMeta.path)
      return (
        <div key={pathToKey(childMeta.path)} className='flex flex-col mb-5'>
          {property.name && (
            <label htmlFor={childPathKey}>{property.name}</label>
          )}
          {property.description && (
            <p className='text-sm text-gray-400 mb-2'>{property.description}</p>
          )}
          <DefaultNodeRenderer nodeMeta={childMeta} parentLayer={parentLayer} />
        </div>
      )
    })}
  </>
}
