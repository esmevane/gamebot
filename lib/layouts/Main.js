import React from 'react'
import PageChange from '../animations/PageChange'

const Main = ({ children }) =>
  <span>
    <header></header>
    <main>
      <PageChange location={ location }>
        { children }
      </PageChange>
    </main>
    <footer></footer>
  </span>

Main.propTypes = { children: React.PropTypes.node }

export default Main
