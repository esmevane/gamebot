import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { browserHistory } from 'react-router'
import { rehydrate } from './local-storage'

import sagas from '../sagas'
import reducers from '../reducers'

let initializer = rehydrate({}, {})

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(browserHistory)
)

const store = createStore(reducers, initializer, middleware)

sagaMiddleware.run(sagas)

export default store
