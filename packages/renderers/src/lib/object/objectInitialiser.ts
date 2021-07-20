import { isObjectNodeConfig } from './isObjectNodeConfig';
import { Initialiser } from '@gdmf/ui-core';

export const objectInitialiser: Initialiser = async (
  {
    path,
    config,
    parentLayer,
    getBranchData,
  }
) => {
  isObjectNodeConfig(config)
  return {
    layer: parentLayer,
    children: config.properties.map(propertyConfig => ({
      path: [ ...path, propertyConfig.id ],
      config: propertyConfig
    }))
  }
}
