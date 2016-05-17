import React from 'react'
import { IndexRoute, Route, Redirect } from 'react-router'

import Main from './layouts/Main'

import Styleguide from './views/Styleguide'
import NotFound from './views/NotFound'

export default (
  <Route path='/' component={ Main }>
    <Route path='styleguide' component={ Styleguide } />
    <Route path="*" component={ NotFound } />
  </Route>
)
