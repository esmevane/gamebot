process.env.NODE_ENV = 'test'

import 'babel-polyfill'
import React from 'react'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiImmutable)
chai.use(chaiAsPromised)

if (global) {
  global.expect = chai.expect
  global.React = React
}
