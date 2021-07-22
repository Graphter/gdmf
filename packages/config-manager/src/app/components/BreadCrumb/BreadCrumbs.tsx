import { PathSegment, pathUtils } from '@gdmf/ui-core';
import { Crumb } from './Crumb';
import { BreadCrumbMapping } from './BreadCrumbMapping';
import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';

interface BreadCrumbsProps {
  path: Array<PathSegment>,
  mappings: Array<BreadCrumbMapping>
}

const DividerSvg = () => <svg className='inline-block w-4 fill-current text-gray-200 mr-2'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20' fill='currentColor'>
  <path fillRule='evenodd'
        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z'
        clipRule='evenodd' />
</svg>;

export const BreadCrumbs = ({ path, mappings }: BreadCrumbsProps) => {
  const rootModelPath = path.slice(0, 1);
  const pathTail = path.slice(1);
  const paths = pathTail.reduce<Array<Array<PathSegment>>>((a, c) => {
    a.push([ ...a[a.length - 1], c ]);
    return a;
  }, [ rootModelPath ]);
  return (
    <div className='pb-5'>
      {paths.map((path, i) => {
        if (i !== paths.length - 1) {
          return (
            <Fragment key={path.length}>
              <Crumb path={path} mappings={mappings} />
              <DividerSvg />
            </Fragment>
          );
        }
        return <Crumb key={path.length} path={path} mappings={mappings} />;
      })}
    </div>
  );
};

