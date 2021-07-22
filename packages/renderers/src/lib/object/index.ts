import { ObjectRenderer } from './ObjectRenderer';
import { objectInitialiser } from './objectInitialiser';
import { NodeRendererRegistration } from '@gdmf/ui-core';

export const objectRegistration: NodeRendererRegistration = {
  type: 'object',
  renderer: ObjectRenderer,
  createDefault: () => {},
  mergeChildData: (config, children) => {
    const data = children.reduce<{ [key: string]: unknown }>((a, c, i) => {
      a[c.config.id] = c.data
      return a
    }, {})
    return { config, data }
  },
  initialiser: objectInitialiser
}
