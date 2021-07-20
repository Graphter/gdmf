import { TextRenderer } from './TextRenderer';
import { NodeRendererRegistration } from '@gdmf/ui-core';

export const textRegistration: NodeRendererRegistration = {
  type: 'text',
  renderer: TextRenderer,
  createDefault: () => ''
}
