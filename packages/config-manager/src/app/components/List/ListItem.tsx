import { NodeConfig, PathSegment } from '@gdmf/ui-core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useBranchData } from '../../../../../ui-core/src/lib/hooks/useBranchData';

export interface ListItemProps {
  config: NodeConfig,
  instanceId: PathSegment,
  displayDataPath?: Array<PathSegment>
}

export const ListItem = ({ config, instanceId, displayDataPath }: ListItemProps) => {
  return (
    <Link to={`/${config.id}/${instanceId}`}>
      {displayDataPath ? (
        <DynamicItemDisplay displayDataPath={displayDataPath} />
      ) : (
        <>{config.id} {instanceId}</>
      )}
    </Link>
  )
}

interface DynamicItemDisplay {
  displayDataPath: Array<PathSegment>
}

const DynamicItemDisplay = ({ displayDataPath }: DynamicItemDisplay) => {
  const displayValue = useBranchData(displayDataPath)
  return <>{typeof displayValue === 'string' ?
    displayValue :
    JSON.stringify(displayValue)}</>
}
