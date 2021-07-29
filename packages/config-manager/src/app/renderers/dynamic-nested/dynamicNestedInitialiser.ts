import { isDynamicNestedNodeConfig } from './isDynamicNestedNodeConfig';
import { Initialiser, NodeConfig, pathUtils, serviceStore } from '@gdmf/ui-core';
import stringify from 'fast-json-stable-stringify';

export const dynamicNestedInitialiser: Initialiser = async (
  {
    path,
    config,
    parentLayer,
    getBranchData
  }
) => {
  isDynamicNestedNodeConfig(config);
  const configService = serviceStore.get<NodeConfig>(config.configServiceId);
  if (!configService.get) throw new Error(`Service '${config.configServiceId}' lacks the get() capability required to use it with a dynamic nested renderer`);
  const targetPaths = pathUtils.resolvePaths(path, config.targetPathQuery);
  if (!targetPaths.length) throw new Error(`Target path should resolve to exactly one path`);
  const targetData = await getBranchData<unknown>(targetPaths[0]);
  if (typeof targetData === 'undefined' || targetData === null) return {
    layer: parentLayer,
    children: [ ]
  };
  const targetId = typeof targetData === 'string' ? targetData : stringify(targetData);
  const nestedConfig = await configService.get(targetId);
  return {
    layer: `${parentLayer}[${targetId}]`,
    children: nestedConfig.item
      ? [
        { path, config: nestedConfig.item }
      ]
      : []
  };
};
