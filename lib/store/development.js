import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

import { rehydrate } from './local-storage'
import sagas from '../sagas'
import DevTools from './DevTools'
import reducers from '../reducers'

let instrument
let initializer     = rehydrate({}, {})
let windowPresent   = typeof window === `object`
let devToolsPresent = false

if (windowPresent) {
  devToolsPresent = typeof window.devToolsExtension !== `undefined`
}

if (windowPresent && devToolsPresent) {
  instrument = window.devToolsExtension()
} else {
  instrument = DevTools.instrument()
}

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(browserHistory)
)

const enhancer = compose(middleware, instrument)
const store = createStore(reducers, initializer, enhancer)

sagaMiddleware.run(sagas)

export default store
