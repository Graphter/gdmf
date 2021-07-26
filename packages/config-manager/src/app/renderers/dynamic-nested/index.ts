import { DynamicNestedRenderer } from './DynamicNestedRenderer';
import { dynamicNestedInitialiser } from './dynamicNestedInitialiser';
import { NodeRendererRegistration } from '@gdmf/ui-core';
import { transparentChildDataMerger } from '@gdmf/renderers';

export const dynamicNestedRegistration: NodeRendererRegistration = {
  type: 'dynamic-nested',
  renderer: DynamicNestedRenderer,
  createDefault: () => {},
  mergeChildData: transparentChildDataMerger,
  initialiser: dynamicNestedInitialiser
}
