import { rendererRegStore } from './stores/rendererRegStore';
import { NodeMeta } from './NodeMeta';

export interface DefaultNodeRendererProps {
  nodeMeta: NodeMeta,
  parentLayer: string
}

export const DefaultNodeRenderer = ({ nodeMeta, parentLayer }: DefaultNodeRendererProps) => {
  const rendererReg = rendererRegStore.get(nodeMeta.config.type)
  return (
    <rendererReg.renderer
      key={nodeMeta.config.id + nodeMeta.config.type}
      path={nodeMeta.path}
      config={nodeMeta.config}
      parentLayer={parentLayer}/>
  )
}