import { atom, RecoilState } from 'recoil';
import { nanoid } from 'nanoid'

export const createAtomStore =
  <Args extends ReadonlyArray<unknown>, T>(
    name: string, keyConverter: (...args: Args) => string
  ) => {
  const store = new Map<string, RecoilState<T>>()
  return {
    get: (...args: Args): RecoilState<T> => {
      const key = keyConverter(...args)
      let state = store.get(key)
      if(!state) throw new Error(`Key '${key}' not found in ${name} store`)
      return state
    },
    has: (...args: Args): boolean => store.has(keyConverter(...args)),
    set: (value: any, ...args: Args) => {
      const key = keyConverter(...args)
      store.set(key, atom<T>({
        key: nanoid(),
        default: value
      }))
    }
  }
}