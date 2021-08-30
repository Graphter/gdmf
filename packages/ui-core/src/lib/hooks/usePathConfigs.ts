import { pathConfigsStore, PathSegment } from '@gdmf/ui-core';
import { useRecoilValue } from 'recoil';

export const usePathConfigs = (path: Array<PathSegment>) => {
  const pathConfigsState = pathConfigsStore.get(path)
  return useRecoilValue(pathConfigsState)
}
