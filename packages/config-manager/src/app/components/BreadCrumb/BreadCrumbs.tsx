import { PathSegment } from '@gdmf/ui-core';
import { Crumb } from './Crumb';
import { BreadCrumbConfigMapping } from './BreadCrumbMapping';
import React from 'react';
import stringify from 'fast-json-stable-stringify';

interface BreadCrumbsProps {
  path: Array<PathSegment>,
  mappings: Array<BreadCrumbConfigMapping>
}


export const BreadCrumbs = ({ path, mappings }: BreadCrumbsProps) => {
  const allConfigMappings = new Map(mappings.map(mapping => [
    stringify(mapping.rootConfig),
    mapping.mappings
  ]))
  return (
    <div className='pb-5'>
      <Crumb
        wholePath={path}
        currentPathSegmentIndex={0}
        currentRootConfigRelativePath={path.slice(0, 2)}
        allConfigMappings={allConfigMappings}
      />
    </div>
  );
};

