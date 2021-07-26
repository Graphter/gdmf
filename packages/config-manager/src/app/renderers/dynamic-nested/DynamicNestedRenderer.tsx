import { ComponentType, useEffect } from 'react';
import { isDynamicNestedNodeConfig } from './isDynamicNestedNodeConfig';
import { DefaultNodeRenderer, NodeRendererProps, pathUtils, useBranchInitialiser, useNodeState } from '@gdmf/ui-core';
import { useBranchData } from '../../../../../ui-core/src/lib/hooks/useBranchData';

export const DynamicNestedRenderer: ComponentType<NodeRendererProps> = (
  {
    path,
    config,
    parentLayer
  }
) => {
  isDynamicNestedNodeConfig(config)
  const branchInitialiser = useBranchInitialiser()
  const targetPaths = pathUtils.resolvePaths(path, config.targetPathQuery)
  if(!targetPaths.length) throw new Error(`Target path should resolve to exactly one path`)
  const targetData = useBranchData<unknown>(targetPaths[0])
  const { childMetas } = useNodeState(path, config)

  useEffect(() => {
    (async () => {
      await branchInitialiser(path, config, parentLayer)
    })()
  }, [ targetData ])

  return childMetas.length ? (
    <DefaultNodeRenderer nodeMeta={childMetas[0]} parentLayer={parentLayer} />
  ) : null
}
