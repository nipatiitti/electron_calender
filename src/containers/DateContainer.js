import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Date from '../components/Date'

const mapStateToProps = (state, props) => {
    console.log(props)
    return {
        date: props.match.params.date
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const DateContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Date))

export default DateContainer
