const searchService = require('../services/searchService')
let self = {}

//le pega a la api a traves del service
self.seeker = (req, res) => {
  let query = req.query.q
  searchService.apiData(query).then( (products) => {
    const result = searchService.result(products)
    return res.json(result)
  }).catch( (err) => {
    console.log(err)
  })
}

module.exports = self
//https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params
