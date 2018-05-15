import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import MonthHeader from './MonthHeader'
import DateGrid from './DateGrid'

class DatePicker extends Component {
  constructor (props) {
    super(props)

    this.state = {
      current: moment(props.date)
    }

  }

  getDaysInMonth (year, month) {
    let date = new Date(year, month, 1)
    let result = []
    while (date.getMonth() === month) {
      result.push({
        n: date.getDate(),
        day: date.getDay()
      })
      date.setDate(date.getDate() + 1)
    }
    return result
  }

  render () {
    let momentjs = this.state.current.clone()
    console.log(momentjs.format('l'))
    return (
      <div className='DatePicker'>
        <div className='datePicker'>
          <MonthHeader
            text={momentjs.format('MMMM') + ', ' + momentjs.year()}
            add={() => {
              momentjs.add(1, 'M')
              this.setState({
                current: momentjs.clone()
              })
            }}
            subtract={() => {
              momentjs.subtract(1, 'M')
              this.setState({
                current: momentjs.clone()
              })
            }}
          />
          <DateGrid
            days={this.getDaysInMonth(momentjs.year(), momentjs.month())}
            year={momentjs.year()}
            month={momentjs.month()}
            onClick={this.props.onClick}
            hide={() => this.setState({open: false})}
          />
        </div>
      </div>
    )
  }
}

DatePicker.propTypes = {
  date: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default DatePicker
