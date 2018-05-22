import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'react-icons/lib/md/done'

const CheckIcon = ({ done, onClick }) => (
    <div className="checkmark" onClick={onClick}>
        {done && <Icon />}
    </div>
)

CheckIcon.propTypes = {
    done: PropTypes.bool.isRequired
}

export default CheckIcon