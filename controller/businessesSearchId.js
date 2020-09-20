const axios = require('axios')
const yelpConfig = require('../api/yelp')
const dbModel = require('../model/dbModel')

const getYelpBusinessesSearch = (req, res, next) => {
    const yelpId = req.params.yelpId

    const getBusinessesSearchById = async (id) => {
        const response = await yelpConfig.businessesSearch.get(`/${id}`)
        const data = response.data
        return data
    }
    const checkIn = (title) => {
        // console.log(title)
        const usersSession = req.session.u_id
        if (usersSession && title != "") {
            const checkAgain = `SELECT * FROM usersdidlike WHERE uid = "${usersSession}" and title like "${title}"`
            dbModel.conn.query(checkAgain, (err, results) => {
                if (err) return res.redirect('/')

                if (results == "") {
                    const data = {
                        uid: usersSession,
                        title: title,
                    }
                    const checkInsertedUser = `INSERT INTO usersdidlike SET ?`
                    dbModel.conn.query(checkInsertedUser, data, (err, results) => {
                        if (err) return res.redirect('/')
                    })
                }
            })
        } else {
            return null
        }
    }

    (async () => {
        const yelData = await getBusinessesSearchById(yelpId)
        // Send detail to Client 
        res.render('foods', {
            businessesSearch: yelData
        })
        // console.log(yelData)
        // Check to click from Client to Server
        var foodTopic = yelData.categories[0].title
        checkIn(foodTopic)
    })()
}
module.exports = { getYelpBusinessesSearch }