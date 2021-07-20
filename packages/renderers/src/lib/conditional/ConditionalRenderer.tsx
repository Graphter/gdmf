import { ComponentType, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isConditionalConfig } from './isConditionalNodeConfig';
import {
  branchDataStore, DefaultNodeRenderer,
  NodeRendererProps,
  pathUtils,
  queryPathToString,
  useBranchInitialiser,
  useNodeState
} from '@gdmf/ui-core';

export const ConditionalRenderer: ComponentType<NodeRendererProps> = (
  {
    path,
    config,
    parentLayer
  }
) => {
  isConditionalConfig(config)
  const { childMetas, layer } = useNodeState(path, config)
  const targetPaths = pathUtils.resolvePaths(path, config.targetPathQuery)
  if(!targetPaths.length) throw new Error(`Couldn't find target path matching '${queryPathToString(config.targetPathQuery)}'`)
  const targetNodeDataState = branchDataStore.get(targetPaths[0])
  const targetNodeData = useRecoilValue(targetNodeDataState)
  const branchInitialiser = useBranchInitialiser()

  useEffect(() => {
    (async () => {
      await branchInitialiser(path, config, parentLayer)
    })()
  }, [ targetNodeData ])

  console.log(`Child layer: ${childMetas[0]?.layer}`)

  return <>
    {childMetas.map(childMeta => <DefaultNodeRenderer key={childMeta.path.join('/')} nodeMeta={childMeta} parentLayer={layer} />)}
  </>
}
