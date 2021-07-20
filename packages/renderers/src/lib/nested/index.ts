import { NestedRenderer } from './NestedRenderer';
import { transparentChildDataMerger } from '../transparentChildDataMerger';
import { nestedInitialiser } from './nestedInitialiser';

export const nestedRegistration = {
  type: 'nested',
  renderer: NestedRenderer,
  mergeChildData: transparentChildDataMerger,
  initialiser: nestedInitialiser
}