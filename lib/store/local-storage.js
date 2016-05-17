import { fromJS } from 'immutable'

const whitelist = [ `form` ]
const whitelisted = (key, val) => whitelist.includes(val)

export function persist(store) {
  return () => {
    if (window) {
      let storage = window.localStorage
      let timestamp = storage.getItem(`gamebot-timestamp`)
      let now = Number(new Date)
      let raw = store.getState()
      let state = fromJS(raw).filter(whitelisted).toJS()

      if (!timestamp) {
        storage.setItem(`gamebot-timestamp`, now)
        storage.setItem(`gamebot-memory`, JSON.stringify(state))
      } else {
        let seconds = 5 * 1000

        if ((now - Number(timestamp)) > seconds) {
          storage.setItem(`gamebot-memory`, JSON.stringify(state))
        }
      }
    }
  }
}

export function rehydrate(initializer, seedState) {
  if (window) {
    let storage = window.localStorage
    let persistedState = storage.getItem(`gamebot-memory`)

    if (persistedState) {
      return { ...initializer, ...(JSON.parse(persistedState)) }
    } else if (seedState) {
      return { ...initializer, ...seedState }
    } else {
      return initializer
    }
  } else {
    return initializer
  }
}
