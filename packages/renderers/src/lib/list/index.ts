import { ListRenderer } from './ListRenderer';
import { listInitialiser } from './listInitialiser';
import { NodeRendererRegistration } from '@gdmf/ui-core';

export const listRegistration: NodeRendererRegistration = {
  type: 'list',
  renderer: ListRenderer,
  createDefault: () => [],
  mergeChildData: (config, children) => {
    return { config, data: children.map(child => child.data) }
  },
  initialiser: listInitialiser
}
