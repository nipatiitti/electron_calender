import React from 'react'
import PropTypes from 'prop-types'

import CheckIcon from './CheckIcon'
import DeleteIcon from 'react-icons/lib/md/close'
const levels = [
    "Skip",
    "Notice",
    "Must do",
    "Highschool depends on it"
  ]

const CalenderItem = ({ name, priority_level, done, onClick, remove }) => {

    let type = 'green'
    
    switch (priority_level) {
        case levels[1]:
            type = 'yellow'
            break;

        case levels[2]:
            type = 'orange'
            break;
        
        case levels[3]:
            type = 'red'
            break;
    
        default:
            break;
    }

    return (
        <div className={`event-item ${type}`} >
            {onClick && <CheckIcon done={done} onClick={onClick}/>}
            <div className="event-text" onClick={onClick && onClick} >
                <p>{name}</p>
            </div>
            {remove &&
                <div className="deleteIcon">
                    <DeleteIcon onClick={remove} />
                </div>
            }
        </div>
    )
}

CalenderItem.propTypes = {
    name: PropTypes.string.isRequired,
    priority_level: PropTypes.oneOf(levels).isRequired,
    done: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    remove: PropTypes.func
}

export default CalenderItem