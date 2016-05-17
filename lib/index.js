import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import store from './store'

let element = document.getElementById('app')
let router  = ({ routing }) => routing
let options = { selectLocationState: router }
let history = syncHistoryWithStore(browserHistory, store, options)
let content = (
  <Provider store={ store }>
    <Router history={ history } routes={ routes } />
  </Provider>
)

render(content, element)
