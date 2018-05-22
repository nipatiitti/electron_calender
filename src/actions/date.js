import history from '../routes/history'

export const saveDate = date => {
  history.push(`/week/${date.format('D-M-YYYY')}`)

  return {
    type: 'SAVE_DATE',
    date
  }
}

