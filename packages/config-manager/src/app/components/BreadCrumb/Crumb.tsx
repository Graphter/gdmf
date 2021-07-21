import { internalNodeDataStore, pathConfigsStore, PathSegment, pathUtils } from '@gdmf/ui-core';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { BreadCrumbMapping } from './BreadCrumbMapping';
import { useBranchData } from '../../../../../ui-core/src/lib/hooks/useBranchData';

interface CrumbProps {
  path: Array<PathSegment>
  mappings: Array<BreadCrumbMapping>
}

export const Crumb = ({ path, mappings }: CrumbProps) => {
  const matchingMapping = mappings.find(mapping =>
    pathUtils.isMatch(path, mapping.pathQuery));
  return (
    <Link
      to={pathUtils.toUrl(path)}
      className='px-2 py-1 border border-gray-200 hover:bg-gray-100 mr-2 rounded text-gray-600 transition-colours duration-200'
    >
      {(() => {
        if(typeof matchingMapping?.displayValue !== 'undefined'){
          return matchingMapping.displayValue
        } else if(typeof matchingMapping?.displayPath !== 'undefined'){
          return <DynamicCrumb path={[ ...path, ...matchingMapping?.displayPath ]} />
        }
        return '[NO MAPPING FOUND]'
      })()}
    </Link>
  );
};

interface DynamicCrumbProps {
  path: Array<PathSegment>
}

const DynamicCrumb = ({ path }: DynamicCrumbProps) => {
  const pathData = useBranchData(path);
  const displayValue = typeof pathData === 'string' ? pathData : JSON.stringify(pathData);
  return (
    <>
      {displayValue || <span className='text-gray-300'>UNNAMED</span>}
    </>
  );
}
