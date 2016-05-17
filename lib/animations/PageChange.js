import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const PageChange = ({ children, location }) => (
  <ReactCSSTransitionGroup transitionName='page-change'
                           transitionAppear={ true }
                           transitionLeave={ false }
                           transitionAppearTimeout={ 500 }
                           transitionEnterTimeout={ 500 } >
    { children && React.cloneElement(children, { key: location.pathname }) }
  </ReactCSSTransitionGroup>
)

PageChange.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object.isRequired
}

export default PageChange
