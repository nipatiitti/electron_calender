import history from '../routes/history'

import {loading, error, baseUrl} from './utils.js'

export const saveDate = date => {
  history.push(`/week/${date.format('D-M-YYY')}`)

  return {
    type: 'SAVE_DATE',
    date
  }
}

