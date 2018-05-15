import moment from 'moment'

const initialState = {
  date: moment()
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_DATE':
      return Object.assign({}, state, {
        date: action.date.toString()
      })

    default:
      return state
  }
}

export default login
