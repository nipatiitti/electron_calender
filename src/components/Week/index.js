import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Date from '../Date'

const Week = ({date}) => {
    let today = moment(date)
    let i = -3
    let week = [0, 0, 0, 0, 0].map(item => {
        i++
        let thisDay = today.clone()
        thisDay.add(i, 'd')
        return (thisDay.clone())
    })

    return (
        <Fragment>
            <p className="hintText">Press date link to get detailed view</p>
            <div className="week-container">
                {
                    week.map((date, i) => (
                        <Date weekView key={i} date={date.format('D-M-YYYY')} />
                    ))
                }
            </div>
        </Fragment>
    )
}

Week.propTypes = {
    date: PropTypes.string.isRequired
}

export default Week