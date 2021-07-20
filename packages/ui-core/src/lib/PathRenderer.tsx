import { PathSegment } from './PathSegment';
import { pathConfigsStore } from './stores/pathConfigsStore';
import { useRecoilValue } from 'recoil';
import { pathLayerStore } from './stores/pathLayerStore';
import { DefaultNodeRenderer } from './DefaultNodeRenderer';
import React from 'react';

interface PathRendererProps {
  path: Array<PathSegment>
}

export const PathRenderer = ({ path }: PathRendererProps) => {
  return path.length === 2 ?
    <TopLevelPathRenderer path={path} /> :
    <NestedPathRenderer path={path} />
}

const TopLevelPathRenderer = ({ path }: PathRendererProps) => {
  const pathConfigsState = pathConfigsStore.get(path)
  const pathConfigs = useRecoilValue(pathConfigsState)
  if(!pathConfigs.length) throw new Error(`No configs at path '${path.join('/')}'`)
  const firstConfig = pathConfigs[0]
  const layerState = pathLayerStore.get(path, firstConfig)
  const layer = useRecoilValue(layerState)

  return (
    <DefaultNodeRenderer nodeMeta={{ path, config: firstConfig, layer  }} parentLayer={''} />
  )
}

const NestedPathRenderer = ({ path }: PathRendererProps) => {
  const pathConfigsState = pathConfigsStore.get(path)
  const pathConfigs = useRecoilValue(pathConfigsState)
  if(!pathConfigs.length) throw new Error(`No configs at path '${path.join('/')}'`)
  const firstConfig = pathConfigs[0]
  const layerState = pathLayerStore.get(path, firstConfig)
  const layer = useRecoilValue(layerState)

  const parentPath = path.slice(0, -1)
  const parentPathConfigsState = pathConfigsStore.get(parentPath)
  const parentPathConfigs = useRecoilValue(parentPathConfigsState)
  const parentPathLayerState = pathLayerStore.get(parentPath, parentPathConfigs[parentPathConfigs.length - 1])
  const parentPathLayer = useRecoilValue(parentPathLayerState)

  return (
    <DefaultNodeRenderer nodeMeta={{ path, config: firstConfig, layer  }} parentLayer={parentPathLayer} />
  )
}