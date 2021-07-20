import { ConditionalRenderer } from './ConditionalRenderer';
import { transparentChildDataMerger } from '../transparentChildDataMerger';
import { conditionalInitialiser } from './conditionalInitialiser';
import { NodeRendererRegistration } from '@gdmf/ui-core';

export const conditionalRegistration: NodeRendererRegistration = {
  type: 'conditional',
  renderer: ConditionalRenderer,
  createDefault: () => {},
  mergeChildData: transparentChildDataMerger,
  initialiser: conditionalInitialiser
}
