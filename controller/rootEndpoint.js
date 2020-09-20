const axios = require('axios').default
const dbModel = require('../model/dbModel');
const configYelpAPI = require('../api/yelp');
const { get } = require('request');

const getData = async () => {
    try {
        const response = await configYelpAPI.businessesSearch.get('/search', {
            params: {
                limit: 50,
                term: '',
                location: 'san jose'
            }
        })
        const data = response.data.businesses
        return data
    } catch {
        return ""
    }
}
const rootEndpoint = (req, res) => {
    // Getting user Session to check auth that
    const usersSession = req.session.u_id
    // If there was a user in session (server side)
    if (usersSession) {
        const getUser = `SELECT * FROM users WHERE uid = "${usersSession}"`
        dbModel.conn.query(getUser, (err, results) => {
            if (err) res.redirect('/login?msg=accessDenied')

            if (results != "") {
                (async () => {
                    res.render('index', {
                        results: results,
                        yelpData: await getData()
                    })
                })()
            }
        })
    } else {
        (async () => {
            res.render('index', {
                results: '',
                yelpData: await getData()
            })
        })()
    }
}
module.exports = { rootEndpoint }