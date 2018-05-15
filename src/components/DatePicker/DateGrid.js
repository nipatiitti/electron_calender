import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

const DateGrid = ({ days, onClick, year, month, hide, week }) => {
  const header =
    <div className='dateGridRow-header'>
      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(( letter, i) => (
        <div className='dateItem' key={i}>
          <p>{letter}</p>
        </div>
      ))}
    </div>

  let rows = []
  let offset = days[0].day - 1
  if (offset < 0) {
    offset = 6
  }
  let k = 0
  let max = days.length

  // Populating 6x7 array to represent the calender month
  for (let i = 0; i < 6; i++) {
    let row = []

    if (i === 0) {
      for (let j = 0; j < offset; j++) {
        row.push(null)
      }
      for (let j = offset; j < 7; j++) {
        row.push(days[k++].n)
      }
    } else {
      for (let j = 0; j < 7; j++) {
        if (k < max) {
          row.push(days[k++].n)
        } else {
          row.push(null)
        }
      }
    }

    rows.push(row)
  }

  const body = rows.map(( row, i ) => (
    <div className='dateGridRow' key={i}>
      {row.map(( day, j) => {
        if (day === null) {
          return (
            <div className='dateItem' key={i+j} >
              <p>{day}</p>
            </div>
          )
        } else {
          return (
            <div
              className='dateItem'
              key={i+j}
              onClick={
                () => onClick(moment(`${day}-${month + 1}-${year}`, 'D-M-YYYY'))
              }
            >
              <p>{day}</p>
            </div>
          )
        }
      })}
    </div>
  ))

  return (
    <div className='dateGrid' onClick={() => hide()}>
      {header}
      {body}
    </div>
  )
}

DateGrid.propTypes = {
  days: PropTypes.array.isRequired,
  year: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  month: PropTypes.number.isRequired,
  hide: PropTypes.func
}

export default DateGrid
