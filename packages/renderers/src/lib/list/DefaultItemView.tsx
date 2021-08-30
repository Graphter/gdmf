import React, { useState } from 'react';
import { NodeConfig, PathSegment, pathUtils, toUrl } from '@gdmf/ui-core';
import { isListNodeConfig } from './isListNodeConfig';
import { useBranchData } from '../../../../ui-core/src/lib/hooks/useBranchData';
import { nanoid } from 'nanoid';
import { useHistory } from 'react-router-dom';

interface DefaultItemViewProps {
  index: number
  listConfig: NodeConfig
  path: Array<PathSegment>
  options?: DefaultExistingItemViewOptions
  onSelect?: (index: number) => void
  onRemove?: (index: number) => void
}

interface DefaultExistingItemViewOptions {
  namePaths?: Array<Array<PathSegment>>
  descriptionPaths?: Array<Array<PathSegment>>
  keyValues?: Array<KeyValueDefinition>
}

interface KeyValueDefinition {
  label: string
  valuePaths: Array<Array<PathSegment>>
}

const deleteIcon = <svg className='w-5 text-red-400' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                        stroke='currentColor'>
  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
</svg>

const expandIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
</svg>

const DefaultItemView = ({ index, listConfig, path, options, onSelect, onRemove }: DefaultItemViewProps) => {
  isListNodeConfig(listConfig);
  const titlePath = [ ...path, ...listConfig.titlePath ];
  let title = useBranchData<any>(titlePath);
  if (typeof title !== 'string') title = JSON.stringify(title);
  const [ supplementaryInformationPaths ] = useState(listConfig.supplementaryInformationPaths?.map(supp => ({
    ...supp,
    id: nanoid()
  })))
  const expandUrl = pathUtils.toUrl(path)
  const history = useHistory()
  return (
    <div className='flex flex-row'>
      <a
        className='flex-grow px-5 mb-2 rounded-lg shadow border border-gray-50 hover:border-blue-200 hover:bg-gray-50 cursor-pointer transition-colours duration-200'
        onClick={(e) => {
          onSelect && onSelect(index)
          e.preventDefault()
        }}
        data-testid='default-item-view'
        href={pathUtils.toUrl(path)}
      >
        <div className='divide-y divide-gray-200'>
          <div className='py-5'>
            <div className='text-xl flex justify-between'>
              {title}
              <span onClick={(e) => history.push(expandUrl)}>{expandIcon}</span></div>
            {listConfig.descriptionPath &&
            <Description descriptionPath={[ ...path, ...listConfig.descriptionPath ]} />}
          </div>
          <div className='flex flex-wrap gap-2 py-5'>
          {supplementaryInformationPaths && supplementaryInformationPaths.map(supp => {
            return <SupplementaryDetail key={supp.id} path={[ ...path, ...supp.path ]} name={supp.name} />;
          })}
          </div>
        </div>
      </a>
      {onRemove && (
        <a
          onClick={() => onRemove(index)}
          className='flex items-center px-5 mb-2 ml-2 rounded-lg shadow border border-gray-50 hover:border-red-200 hover:bg-red-50 cursor-pointer transition-colours duration-200'>
          {deleteIcon}
        </a>
      )}
    </div>
  );
};

const Description = ({ descriptionPath }: { descriptionPath: Array<PathSegment> }) => {
  let description = useBranchData<any>(descriptionPath);
  return <div className='text-sm text-gray-900'>{description}</div>
}

interface SupplementaryDetail {
  name: string,
  path: Array<PathSegment>
}

const SupplementaryDetail = ({ name, path }: SupplementaryDetail) => {
  let value = useBranchData<any>(path);
  return (
    <span className='inline-block px-2 py-1 text-sm bg-gray-100 rounded-3xl'>
      <span className='text-gray-300'>{name}:</span>{' '}
      <span>{value}</span>
    </span>
  );
};


export default DefaultItemView;
