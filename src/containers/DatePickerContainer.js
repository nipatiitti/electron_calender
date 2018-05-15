import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { saveDate } from '../actions/date'

import DatePicker from '../components/DatePicker'

const mapStateToProps = (state, props) => {
  return {
    location: props.location,
    date: state.date.date
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: date => (
      dispatch(saveDate( date ))
    )
  }
}

const DatePickerContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePicker))

export default DatePickerContainer
