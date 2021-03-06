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
            return new Promise((resolve, reject) => {
                    fs.readFile(url, (err, data) => {  
                        if (err) reject(err)
                        let dataToResolve = JSON.parse(data)
                        resolve(dataToResolve)
                    })
                })
        
        case 'date':
            return (date = defaultDate()) => {
                return new Promise((resolve, reject) => {
                    fs.readFile(url, (err, data) => {
                        if (err) reject(err)
                        try {
                            let dataToResolve = JSON.parse(data)[date]
                            if(!dataToResolve) {
                                resolve({
                                    events: []
                                })
                            }
                            resolve(dataToResolve)
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

export const write = (date = defaultDate(), event) => {
    query('all').then(data => {
        let newEvents
        try {
            newEvents = [...data[date].events, event]
        } catch (e) {
            newEvents = [event]
        }
        
        let newData = JSON.stringify(Object.assign({}, data, {
            [date]: {
                events: newEvents
            }
        }), null, 2)

        fs.writeFileSync(url, newData)
    })
}

export const replace = (date = defaultDate(), event) => {
    query('all').then(data => {
        let newEvents = [...(data[date].events.filter(item => item.name !== event.name)), event]
        let newData = JSON.stringify(Object.assign({}, data, {
            [date]: {
                events: newEvents
            }
        }), null, 2)
        
        fs.writeFileSync(url, newData)
    })
}

export const remove = (date = defaultDate(), event) => {
    query('all').then(data => {
        let newEvents = data[date].events.filter(item => item.name !== event.name)
        let newData = JSON.stringify(Object.assign({}, data, {
            [date]: {
                events: newEvents
            }
        }), null, 2)

        fs.writeFileSync(url, newData)
    })
}