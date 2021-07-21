import { configStore, PathRenderer, pathUtils, useBranchDataCallback, useBranchInitialiser } from '@gdmf/ui-core';
import { useEffect, useState } from 'react';
import { pageModel } from '../models/pageModel';
import { simpleTextModel } from '../models/simpleTextModel';
import { pageData } from '../models/pageData';
import { useParams } from 'react-router-dom';

export const Edit = () => {
  const params = useParams<{ path: string }>();
  const path = pathUtils.fromUrl(params.path)
  const rootPath = path.slice(0, 2)

  const save = useBranchDataCallback(rootPath, async (branchData) => {
    console.log({ branchData })
  })

  const [ initialising, setInitialising ] = useState(true)

  configStore.set(pageModel)
  configStore.set(simpleTextModel)

  const branchInitialiser = useBranchInitialiser()
  useEffect(() => {
    (async () => {
      setInitialising(true)
      await branchInitialiser(rootPath, pageModel, '', pageData)
      //await branchInitialiser(rootPath, model, '', {})

      setInitialising(false)
    })()
  }, [])

  if(initialising){
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="App container p-10 mt-10 rounded-2xl bg-white">
      <form>
        <PathRenderer path={path} />
        <button type='submit' onClick={save}>Save</button>
      </form>
    </div>
  );
}
