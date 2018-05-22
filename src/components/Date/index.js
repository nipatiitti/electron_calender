import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { query, write, replace, remove } from '../../actions/database'
import PlusIcon from 'react-icons/lib/md/add'
import Item from '../CalenderItem'

const fs = window.require('fs')
const url = './src/database.json'

class DateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            moment: moment(props.date, 'D-M-YYYY'),
            loading: true,
            events: [],
            open: false,
            name: '',
            priority_level: 'Skip'
        }
        this.watch = null
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    componentDidMount() {
        this.getData()

        this.watch = fs.watch(url, (err, data) => {
            this.getData()
        })

        document.addEventListener('mousedown', this.handleClickOutside)
    }
    
    componentWillUnmount() {
        this.watch.close()
        document.removeEventListener('mousedown', this.handleClickOutside)
    }

    getData = () => {
        query('date')(this.props.date).then(data => {
            this.setState({
                loading: false,
                events: data.events
            })
        }).catch((e) => {
            console.error(e)
        })
    }

    handleClickOutside = e => {
        if (this.refs.click && !this.refs.click.contains(e.target)) {
            this.setState({
                open: false
            })
        }
    }

    onChange = name => e => (
        this.setState({
            [name]: e.target.value
        })
    )

    sort = array => (
        array.sort(( a, b ) => (
            a.priority_level > b.priority_level ? 
                1 
              :
                a.priority_level < b.priority_level ? 
                    -1
                :
                    a.name > b.name ?
                        1
                    :
                        a.name < b.name ?
                            -1
                        :
                            0
            )
        )
    )

    popup = () => {
        const { open } = this.state

        this.setState({
            open: !open
        })
    }

    add = () => {
        const { name, priority_level } = this.state

        if (name === '')
            return

        write(this.props.date, {name, priority_level, done: false})
    }

    change = ({name, priority_level, done}) => (
        replace(this.props.date, {name, priority_level, done: !done})
    )

    render() {
        const events = this.sort(this.state.events)
        const show = this.props.weekView
        return (
            <div className="date-container">
                {show && 
                    <NavLink to={`/${this.state.moment.format('D-M-YYYY')}`}>
                        {this.state.moment.format('dddd')}
                    </NavLink>
                }
                <div className={`add-popup ${this.state.open ? 'open' : 'closed'}`}>
                    <div className="innerContainer" ref="click">
                        <input placeholder="Name..." className="textinput" onChange={this.onChange('name')} />
                        <p>Priority level</p>
                        <select value={this.state.priority_level} onChange={this.onChange('priority_level')}>
                            <option value="Skip" className="option">Skip</option>
                            <option value="Notice" className="option">Notice</option>
                            <option value="Must do" className="option">Must do</option>
                            <option value="Highschool depends on it" className="option">Highschool depends on it</option>
                        </select>
                        <div className="end-button" onClick={this.add}>
                            <p>Submit</p>
                        </div>
                    </div>
                </div>
                {!show &&
                    <div className="add-button" onClick={this.popup}>
                        <PlusIcon /> <p>Add new</p>
                    </div>
                }
                { !show ?
                    events.map(( item, i ) => (
                        <Item {...item}
                            onClick={() => this.change(item)}
                            key={i}
                            remove={() => remove(this.props.date, item)}    
                        />
                    ))
                :
                    events.map(( item, i ) => (
                        <Item {...item}
                            key={i} 
                        />
                    ))
                }
            </div>
        )
    }
}

DateComponent.propTypes = {
    date: PropTypes.string.isRequired,
    weekView: PropTypes.bool
}

export default DateComponent