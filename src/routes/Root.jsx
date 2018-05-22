import React from 'react'
import PropTypes from 'prop-types'

import {
  Router,
  Route,
  Switch
} from 'react-router-dom'

import { PersistGate } from 'redux-persist/integration/react'

import { Provider } from 'react-redux'

import history from './history'

import Header from '../containers/HeaderContainer'
import DatePicker from '../containers/DatePickerContainer'
import Week from '../containers/WeekContainer'
import Date from '../containers/DateContainer'

const Root = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={<h1>Loading</h1>} persistor={persistor}>
      <Router history={history}>
        <div className="root-container">
          <Header />
          <Switch>
            <Route exact path='/'>
              <DatePicker />
            </Route>
            <Route exact path='/week'>
              <Week />
            </Route>
            <Route exact path='/:date/'>
              <Date />
            </Route>
            <Route exact path='/week/:date'>
              <Week />
            </Route>
          </Switch>
        </div>
      </Router>
    </PersistGate>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  persistor: PropTypes.object.isRequired
}

export default Root
