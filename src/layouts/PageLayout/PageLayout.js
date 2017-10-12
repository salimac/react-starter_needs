import React from 'react'
import PropTypes from 'prop-types'
import './PageLayout.scss'
import Navigation from '../../components/Navigation'
import store from '../../main'

export const PageLayout = ({ children }) => (
  <div className='container text-center'>
    <Navigation store={store} />
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node
}

export default PageLayout
