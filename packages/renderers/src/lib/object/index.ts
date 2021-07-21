import { ObjectRenderer } from './ObjectRenderer';
import { isObjectNodeConfig } from './isObjectNodeConfig';
import { objectInitialiser } from './objectInitialiser';
import { NodeRendererRegistration } from '@gdmf/ui-core';

export const objectRegistration: NodeRendererRegistration = {
  type: 'object',
  renderer: ObjectRenderer,
  createDefault: () => {},
  mergeChildData: (config, childData) => {
    isObjectNodeConfig(config)
    if(!Array.isArray(childData)) throw new Error(`'object' renderer was expecting an array of child data but got '${JSON.stringify(childData)}' instead`)
    return config.properties.reduce<{ [key: string]: any }>((a, c, i) => {
      a[c.config.id] = childData[i]
      return a
    }, {})
  },
  initialiser: objectInitialiser
}
