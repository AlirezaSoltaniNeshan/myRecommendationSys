const axios = require('axios').default
const dbModel = require('../model/dbModel');
const configYelpAPI = require('../api/yelp')

const rootEndpoint = (req, res) => {
    const getData = async () => {
        const response = await configYelpAPI.businessesSearch.get('/search', {
            params:{
                limit: 50,
                term: '',
                location: 'san jose'
            }
        })
        const data = response.data.businesses

        var finalResults = ""
        const usersSession = req.session.u_id

        if (usersSession) {
            const getUser = `SELECT * FROM users WHERE uid = "${usersSession}"`
            dbModel.conn.query(getUser, (err, results) => {
                if (err) res.redirect('/login?msg=accessDenied')

                if (results != "") {
                    finalResults = results

                    res.render('index', {
                        results: finalResults,
                        yelpData: data
                    })

                }

            })
        } else {
            res.render('index', {
                results: finalResults,
                yelpData: data
            })
           
        }
    }

    getData()
}
module.exports = { rootEndpoint }