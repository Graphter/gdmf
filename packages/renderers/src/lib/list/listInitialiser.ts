import { isListNodeConfig } from './isListNodeConfig';
import { nanoid } from 'nanoid';
import { createDefault, ensureValue, Initialiser } from '@gdmf/ui-core';

type ListInternalData = Array<{
  committed: boolean,
  deleted: boolean,
  order: number
}>

export const listInitialiser: Initialiser = async (
  {
    path,
    config,
    parentLayer,
    getBranchData,
    getInternalData
  }
) => {
  isListNodeConfig(config)
  let internalData = await ensureValue<ListInternalData>(
    await getInternalData(parentLayer),
    async () => {
      const externalData = await getBranchData(path)
      const value = Array.isArray(externalData)
        ? externalData.map((item, i) => ({
          key: nanoid(),
          deleted: false,
          committed: true,
          order: i
        }))
        : await createDefault<ListInternalData>(config)
      return value
    })

  return {
    layer: parentLayer,
    internalData,
    children: internalData.map((item: any, i: number) => ({
      path: [ ...path, i ],
      config: config.itemConfig
    })),
  }
}
