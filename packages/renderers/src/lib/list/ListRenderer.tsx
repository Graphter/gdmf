import { ComponentType, useEffect } from 'react';
import { isListNodeConfig } from './isListNodeConfig';
import { DefaultNodeRenderer, NodeRendererProps, pathToKey, useBranchInitialiser, useNodeState } from '@gdmf/ui-core';
import { InternalListData } from './InternalListData';
import DefaultItemView from './DefaultItemView';

export const ListRenderer: ComponentType<NodeRendererProps> = (
  {
    path,
    config,
    parentLayer
  }
) => {
  isListNodeConfig(config);
  const {
    internalData,
    setInternalData,
    childMetas,
    layer
  } = useNodeState<InternalListData>(path, config);

  if(childMetas.length !== internalData.length){
    throw new Error(`Child metas vs internal data length mismatch. Something wrong with init.`)
  }

  return <>
    {childMetas.map((childMeta, i) => {
      const { committed, deleted, order, editing } = internalData[i];
      if (deleted) return null;
      const key = pathToKey(childMeta.path);
      if (!editing) {
        return (
          <div key={key}>
            <DefaultItemView
              index={i}
              listConfig={config}
              path={childMeta.path}
              onSelect={(index) => {
                (async () => {
                  const newInternalData = [ ...internalData ];
                  newInternalData[index] = {
                    ...newInternalData[index],
                    editing: true
                  };
                  await setInternalData(newInternalData, true);
                })();
              }}
              onRemove={(index) => {
                (async () => {
                  const newInternalData = [ ...internalData ];
                  newInternalData[index] = {
                    ...newInternalData[index],
                    deleted: true
                  };
                  await setInternalData(newInternalData, true);
                })();
              }}
            />
          </div>
        );
      }
      return (
        <div key={key} className='flex-grow p-5 mb-2 rounded-lg shadow border border-blue-200 bg-gray-50'>

          <DefaultNodeRenderer nodeMeta={childMeta} parentLayer={layer} />
          <button
            type='button'
            className='p-5 border border-dashed rounded hover:border-blue-200 hover:bg-gray-50 transition-colours duration-200 text-blue-300'
            onClick={() => {
              (async () => {
                const newInternalData = [ ...internalData ];
                newInternalData[i] = {
                  ...newInternalData[i],
                  editing: false
                };
                await setInternalData(newInternalData, true);
              })();
            }}>done
          </button>
        </div>
      );
    })}

    <button
      type='button'
      className='p-5 border border-dashed rounded hover:border-blue-200 hover:bg-gray-50 transition-colours duration-200 text-blue-300'
      onClick={() => {
        (async () => {
          await setInternalData([ ...internalData, {
            committed: false,
            deleted: false,
            order: childMetas.length,
            editing: true
          } ], true);
        })();
      }}>[+]
    </button>
  </>;
};
