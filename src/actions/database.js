import moment from 'moment'
const fs = window.require('fs')
const url = './src/database.json'

// Check that database exists
fs.writeFile(url, {}, { flag: 'wx' }, (err) => {
    if (err) console.log(err)
    console.log("It's saved!")
})

const defaultDate = () => moment().format('D-M-YYYY')

export const query = ( type = 'all') => {
    switch (type) {
        case 'all':
            return () => {
                return new Promise((resolve, reject) => {
                    fs.readFile(url, (err, data) => {  
                        if (err) reject(err)
                        resolve(JSON.parse(data))
                    })
                })
            }
        
        case 'date':
            return (date = defaultDate()) => {
                return new Promise((resolve, reject) => {
                    fs.readFile(url, (err, data) => {
                        if (err) reject(err)
                        try {
                            resolve(JSON.parse(data)[date])
                        } catch (err) {
                            resolve({
                                events: []
                            })
                        }
                    })
                })
            }
    
        default:
            break;
    }
}

export const write = (date = defaultDate(), events) => {
    query('date')(date).then(data => {
        let newEvents = [...data.events, ...events]
        let newData = JSON.stringify(Object.assign({}, data, {
            [date]: {
                events: newEvents
            }
        }), null, 2)

        fs.writeFile(url, newData)
    })
}