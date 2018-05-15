import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'

const Header = ({ location }) => {
  let items = location.pathname.split('/')
  if(items[items.length-1]==='')
    items.pop()

  return (
    <div className="header">
      {
        items.map(( item, i ) => (
          <NavLink key={i} to={item === "" ? '/' : `/${item}`}>
            {item === "" ? `/home` : `/${item}`}
          </NavLink>
        ))
      }
    </div>
  )
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Header
