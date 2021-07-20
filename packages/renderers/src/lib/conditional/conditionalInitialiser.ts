import { isConditionalConfig } from './isConditionalNodeConfig';
import stringify from "fast-json-stable-stringify";
import { createDefault, Initialiser, InitResult, pathUtils } from '@gdmf/ui-core';

export const conditionalInitialiser: Initialiser = async (
  {
    path,
    config,
    parentLayer,
    getBranchData,
  }
) => {
  isConditionalConfig(config)

  const targetPaths = pathUtils.resolvePaths(path, config.targetPathQuery)
  const targetData = targetPaths.length ? await getBranchData(targetPaths[0]) : await createDefault(config)
  const targetDataKey = generateBranchKey(targetData)
  const matchingConfig = config.branches.get(targetDataKey)
  if(!matchingConfig){
    return { layer: '' }
  }
  const result: InitResult = {
    layer: `${parentLayer}[${matchingConfig.id}]`,
    children: [
      {
        path,
        config: matchingConfig
      }
    ]
  }
  return result
}

const generateBranchKey = (targetData: any) => {
  const targetDataType = typeof targetData
  if(targetDataType === 'string') return targetData
  if(targetDataType === 'number') return targetData.toString()
  return stringify(targetData)
}
