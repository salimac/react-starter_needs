import React from 'react'
import { IndexLink, Link } from 'react-router'
class Navigation extends React.Component {
  constructor (props) {
      super(props)
  }
  render () {
    const {store} = this.props
    console.log(store && store.getState())
    return (
      <div>
          <h1>React Redux Starter Kit</h1>
          <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
          <Link to='/counter' activeClassName='page-layout__nav-item--active'>Counter</Link>
      </div>
    )
  }
}

export default Navigation