import { NodeConfig, PathSegment, pathUtils, useBranchData, usePathConfigs } from '@gdmf/ui-core';
import { Link } from 'react-router-dom';
import { BreadCrumbMapping } from './BreadCrumbMapping';
import stringify from 'fast-json-stable-stringify';
import React from 'react';

const DividerSvg = () => <svg className='inline-block w-4 fill-current text-gray-200 mr-2'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20' fill='currentColor'>
  <path fillRule='evenodd'
        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z'
        clipRule='evenodd' />
</svg>;

interface CrumbProps {
  wholePath: Array<PathSegment>;
  currentPathSegmentIndex: number;
  currentRootConfigRelativePath: Array<PathSegment>;
  allConfigMappings: Map<string, Array<BreadCrumbMapping>>;
  currentRootConfig?: NodeConfig;
  currentRootConfigMappings?: Array<BreadCrumbMapping>;
}

export const Crumb = (
  {
    wholePath,
    currentPathSegmentIndex,
    currentRootConfigRelativePath,
    allConfigMappings,
    currentRootConfig,
    currentRootConfigMappings
  }: CrumbProps) => {
  // First check if there's a new root config to use
  const currentPath = wholePath.slice(0, currentPathSegmentIndex + 1);
  const pathConfigs = usePathConfigs(currentPath);
  const newRootConfig = pathConfigs.find(config => allConfigMappings.has(stringify(config)));
  const newRootConfigKey = stringify(newRootConfig);
  const currentRootConfigKey = stringify(currentRootConfig);
  if (newRootConfig && newRootConfigKey !== currentRootConfigKey) {
    currentRootConfigRelativePath = [];
    currentRootConfig = newRootConfig;
    currentRootConfigMappings = allConfigMappings.get(newRootConfigKey) as Array<BreadCrumbMapping>;
  }
  // Search current root config mappings for a match
  const matchingMapping = currentRootConfigMappings?.find(mapping =>
    currentRootConfigRelativePath && pathUtils.isMatch(currentRootConfigRelativePath, mapping.relativePathQuery));

  const nextPathSegmentIndex = currentPathSegmentIndex + 1;
  const nextRootConfigRelativePath = [ ...currentRootConfigRelativePath || [], wholePath[nextPathSegmentIndex] ];

  return (
    <>
      <Link
        to={pathUtils.toUrl(currentPath)}
        className='px-2 py-1 border border-gray-200 hover:bg-gray-100 mr-2 rounded text-gray-600 transition-colours duration-200'
      >
        {(() => {
          if (typeof matchingMapping?.displayValue !== 'undefined') {
            return matchingMapping.displayValue;
          } else if (typeof matchingMapping?.displayPath !== 'undefined') {
            return <DynamicCrumb path={[ ...currentPath, ...matchingMapping?.displayPath ]} />;
          }
          return '[NO MAPPING FOUND]';
        })()}
      </Link>
      {currentPathSegmentIndex < wholePath.length - 1 && (
        <>
          <DividerSvg />
          <Crumb
          wholePath={wholePath}
          currentPathSegmentIndex={nextPathSegmentIndex}
          currentRootConfig={currentRootConfig}
          currentRootConfigRelativePath={nextRootConfigRelativePath}
          currentRootConfigMappings={currentRootConfigMappings}
          allConfigMappings={allConfigMappings}
        />
        </>
      )}
    </>
  );
};

interface DynamicCrumbProps {
  path: Array<PathSegment>;
}

const DynamicCrumb = ({ path }: DynamicCrumbProps) => {
  const pathData = useBranchData(path);
  const displayValue = typeof pathData === 'string' ? pathData : JSON.stringify(pathData);
  return (
    <>
      {displayValue || <span className='text-gray-300'>UNNAMED</span>}
    </>
  );
};
