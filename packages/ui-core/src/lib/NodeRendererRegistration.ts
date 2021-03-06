import { PathSegment } from './PathSegment';
import { NodeConfig } from './NodeConfig';
import { ComponentType } from 'react';

export interface NodeRendererRegistration {
  type: string,
  renderer: ComponentType<NodeRendererProps>,
  createDefault?: (config: NodeConfig) => any | Promise<any>,
  mergeChildData?: (config: NodeConfig, childData: unknown) => any,
  initialiser?: Initialiser
}

export interface InitResult {
  layer: string,
  internalData?: any
  children?: Array<{
    path: Array<PathSegment>,
    config: NodeConfig
  }>
}

export interface Initialiser {
  (
    {
      path,
      config,
      getBranchData,
      getInternalData
    }: {
      path: Array<PathSegment>,
      config: NodeConfig,
      parentLayer: string,
      getBranchData: <T>(path: Array<PathSegment>) => Promise<T | undefined>,
      getInternalData: <T>(layer: string) => Promise<T | undefined>,
    }
  ): Promise<InitResult> | InitResult
}

export interface NodeRendererProps {
  path: Array<PathSegment>,
  config: NodeConfig,
  parentLayer: string
}