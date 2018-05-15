import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ name, type, color, onClick }) => {
  let base = 'icon material-icons '
  if (type) { base += type }
  if (color) { base += ' ' + color }
  return (
    <i onClick={() => { if (onClick) onClick() }} className={base}>{name}</i>
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
}

export default Icon
