import { NodeConfig } from '@gdmf/ui-core';

const findIndex = (configs: Array<NodeConfig>, config: NodeConfig) =>
  configs.findIndex(eachConfig => eachConfig === config)

export const configUtils = {
  findIndex
}
