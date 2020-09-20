const dbModel = require('../model/dbModel').conn
const axios = require('axios').default
const { rejects } = require('assert')
const { resolve } = require('path')
const yelp = require('../api/yelp')


const getYelpDataByTitle = async (title) => {
    const responseByTitle = await yelp.businessesSearch.get('/search', {
        params: {
            limit: 20,
            term: title,
            location: 'san jose'
        }
    })
    const dataByTitle = responseByTitle.data.businesses
    return dataByTitle
}

const findTitleInResults = (results) => {
    return new Promise(async (resolve, rejects) => {
        var recommend = []
        for (title in results) {
            const data = await getYelpDataByTitle(results[title].title)
            recommend.push(data)
        }
        resolve(recommend)
    })
}

const getRecommendationTitle = (req, res) => {

    // Get users did like with query to mysql 
    const userSession = req.session.u_id
    if (userSession) {
        const cmd = `SELECT title 
        FROM usersdidlike
        join users on usersdidlike.uid = users.uid 
        where usersdidlike.uid = "${userSession}"`

        dbModel.query(cmd, (err, results) => {
            if (err) res.redirect('/')

            if (results != "") {
                findTitleInResults(results).then(recommend => {
                    res.render('recommendFoods', {
                        results: recommend
                    })
                })
            } else {
                res.render('recommendFoods', {
                    results: 'NotFoundRecommend'
                })
            }
        })
    } else {
        res.render('recommendFoods', {
            results: 'accessDenied'
        })
    }
}


module.exports = { getRecommendationTitle }