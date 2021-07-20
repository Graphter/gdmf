interface PromiseQueue<T, Args extends ReadonlyArray<unknown>> {
  enqueue: (promiseFn: PromiseFn<T, Args>, ...args: Args) => Promise<T>
}

interface PromiseFn<T, Args extends ReadonlyArray<unknown>> {
  (...args: Args): Promise<T>
}

export const createPromiseQueue = <T, Args extends ReadonlyArray<unknown>>(): PromiseQueue<T, Args> => {
  const queue: Array<{
    promiseFn: PromiseFn<T, Args>,
    args: Args,
    resolve: (value: any) => void,
    reject: (err: Error) => void }> = []
  let workingOnPromise = false
  const enqueue = (promiseFn: PromiseFn<T, Args>, ...args: Args) => {
    return new Promise<T>((resolve, reject) => {
      queue.push({
        promiseFn,
        args,
        resolve,
        reject
      })
      dequeue()
    })
  }
  const dequeue = () => {
    if (workingOnPromise) return
    const item = queue.shift()
    if (!item) return
    try {
      workingOnPromise = true
      item.promiseFn(...item.args)
        .then((value) => {
          workingOnPromise = false
          item.resolve(value)
          dequeue()
        })
        .catch((err) => {
          workingOnPromise = false
          item.reject(err)
          dequeue()
        })
    } catch (err) {
      workingOnPromise = false
      item.reject(err)
      dequeue()
    }
  }
  return {
    enqueue
  }
}