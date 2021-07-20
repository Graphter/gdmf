import { configStore, PathRenderer, useBranchDataCallback, useBranchInitialiser } from '@gdmf/ui-core';
import { useEffect, useState } from 'react';
import { pageModel } from '../models/pageModel';
import { simpleTextModel } from '../models/simpleTextModel';
import { pageData } from '../models/pageData';

export const Edit = () => {
  const rootPath = [ 'model', 'one' ]

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
        <PathRenderer path={[ ...rootPath ]} />
        <button type='submit' onClick={save}>Save</button>
      </form>
    </div>
  );
}
