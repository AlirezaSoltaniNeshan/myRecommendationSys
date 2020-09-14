const axios = require('axios').default

const businessesSearch = axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: 'Bearer 5no_SevFWH4JbC9I1MYmmusxgBuiAzgx6rOcAPCxkGHa5-PZ2X11NJ-c3tDXMpzIo8SalIPH1wiIz3RtCsHkjKjnB7x7pPbaGbg2fR2ZxWH2uh9ycyXRtl5eKXoqX3Yx'
  }
})

module.exports = { businessesSearch }