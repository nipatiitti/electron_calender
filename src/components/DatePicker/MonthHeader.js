import React from 'react'
import PropTypes from 'prop-types'

import Icon from '../Icon'

const MonthHeader = ({ text, add, subtract }) => (
  <div className='monthHeader'>
    <Icon name='keyboard_arrow_left' type='small' color='dark' onClick={subtract} />
    <p className='monthHeaderText'>{text}</p>
    <Icon name='keyboard_arrow_right' type='small' color='dark' onClick={add} />
  </div>
)

MonthHeader.propTypes = {
  text: PropTypes.string.isRequired,
  add: PropTypes.func.isRequired,
  subtract: PropTypes.func.isRequired
}

export default MonthHeader
