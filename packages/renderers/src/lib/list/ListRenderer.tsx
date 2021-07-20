import { ComponentType, useEffect } from 'react';
import { isListNodeConfig } from './isListNodeConfig';
import { DefaultNodeRenderer, NodeRendererProps, pathToKey, useBranchInitialiser, useNodeState } from '@gdmf/ui-core';

export const ListRenderer: ComponentType<NodeRendererProps> = (
  {
    path,
    config,
    parentLayer
  }
) => {
  isListNodeConfig(config)
  const initialiser = useBranchInitialiser()
  const {
    internalData,
    setInternalData,
    childMetas,
    layer
  } = useNodeState<{
    committed: boolean,
    deleted: boolean,
    order: number
  }>(path, config)

  useEffect(() => {
    (async () => {
      await initialiser(path, config, parentLayer)
    })()
  }, [internalData])

  return <>
    {childMetas.map((childMeta, i) => {
      const { committed, deleted, order } = internalData[i]
      if(deleted) return null
      return (
        <div key={pathToKey(childMeta.path)}>
          <DefaultNodeRenderer nodeMeta={childMeta} parentLayer={layer} />
        </div>
      )
    })}
    <button onClick={() => {
      setInternalData([ ...internalData, {
        committed: false, deleted: false, order: childMetas.length
      }])

    }}>Add</button>
  </>
}
