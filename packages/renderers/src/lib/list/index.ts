import { ListRenderer } from './ListRenderer';
import { listInitialiser } from './listInitialiser';
import { NodeRendererRegistration } from '@gdmf/ui-core';

export const listRegistration: NodeRendererRegistration = {
  type: 'list',
  renderer: ListRenderer,
  createDefault: () => [],
  mergeChildData: (config, childData) => {
    if(!Array.isArray(childData)) throw new Error(`'list' renderer was expecting an array of child data but got '${JSON.stringify(childData)}' instead`)
    return childData
  },
  initialiser: listInitialiser
}
