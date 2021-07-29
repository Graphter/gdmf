import { ObjectRenderer } from '../object/ObjectRenderer';
import { objectInitialiser } from '../object/objectInitialiser';
import { NodeRendererRegistration } from '@gdmf/ui-core';
import { transparentChildDataMerger } from '../transparentChildDataMerger';
import { objectRendererConfig } from '../object/objectRendererConfig';

export const transparentObjectRegistration: NodeRendererRegistration = {
  type: 'transparent-object',
  renderer: ObjectRenderer,
  createDefault: () => {},
  mergeChildData: transparentChildDataMerger,
  initialiser: objectInitialiser,
  config: objectRendererConfig
}
