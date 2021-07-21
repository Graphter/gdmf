import { ListNodeConfig } from './ListNodeConfig';
import { NodeConfig } from '@gdmf/ui-core';

export function isListNodeConfig(config: NodeConfig): asserts config is ListNodeConfig {
  const listConfig = config as ListNodeConfig
  const isListNodeConfig = 'itemConfig' in listConfig &&
    typeof listConfig.itemConfig === 'object' &&
    Array.isArray(listConfig.titlePath) && listConfig.titlePath.length > 0 &&
    (!listConfig.supplementaryInformationPaths || (
      Array.isArray(listConfig.supplementaryInformationPaths) &&
      listConfig.supplementaryInformationPaths.length > 0
    )) &&
    (!listConfig.descriptionPath || (
      Array.isArray(listConfig.descriptionPath) &&
        listConfig.descriptionPath.length > 0
    ))
  if(!isListNodeConfig) throw new Error(`Invalid list config ${JSON.stringify(config, null, 2)}`)
}
