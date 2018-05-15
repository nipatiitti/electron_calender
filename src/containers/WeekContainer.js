import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { saveDate } from '../actions/date'

import Week from '../components/Week'

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

const WeekContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Week))

export default WeekContainer
