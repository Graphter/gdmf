import { branchDataStore, PathSegment } from '@gdmf/ui-core';
import { useRecoilValue } from 'recoil';

export const useBranchData = (path: Array<PathSegment>) => {
  const state = branchDataStore.get(path)
  return useRecoilValue(state)
}
