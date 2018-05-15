import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { query, write } from '../../actions/database'

class DateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            events: []
        }
    }

    componentDidMount() {
        query('date')(this.props.date).then(data => {
            this.setState({
                loading: false,
                events: data.events
            })
        }).catch((e) => {
            console.error(e)
        })
    }

    render() {
        return (
            <div className="date-container">
                
            </div>
        )
    }
}

DateComponent.propTypes = {

}

export default DateComponent