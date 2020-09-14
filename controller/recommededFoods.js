const dbModel = require('../model/dbModel').conn
const axios = require('axios').default
const yelp = require('../api/yelp')


const getYelpDataByTitle = async (title) => {
    const responseByTitle = await yelp.businessesSearch.get('/search', {
        params: {
            limit: 2,
            term: title,
            location: 'san jose'
        }
    })
    const dataByTitle = responseByTitle.data.businesses
    return dataByTitle
}

const getRecommendationTitle = (req, res) => {

    // Get users did like with query to mysql 
    var finalRecommendResults = ""
    const userSession = req.session.u_id
    if (userSession) {
        const cmd = `SELECT title 
        FROM usersdidlike
        join users on usersdidlike.uid = users.uid 
        where usersdidlike.uid = "${userSession}"`

        dbModel.query(cmd, (err, results) => {
            if (err) res.redirect('/')

            if (results != "") {
                (async () => {
                    var recommend = []
                    for (title in results) {
                        var data = await getYelpDataByTitle(results[title].title)
                        recommend.push(data)
                    }
                    res.render('recommendFoods', {
                        results: recommend[0]
                    })
                    // console.log(recommend[0])
                })()
            }
        })
    } else {
        res.render('recommendFoods', {
            results: finalRecommendResults
        })
    }
}


module.exports = { getRecommendationTitle }