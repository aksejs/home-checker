const axios = require('axios')

const search = (req, res, API_KEY) => {
  axios
    .get('https://rosreestr.net/api/method/database.search', {
      params: {
        request: req.body.query.address,
        access_token: API_KEY,
        v: '1.0'
      }
    })
    .then(({ data }) => {
      console.log(req.body.query)
      const { response } = data
      if (!response) {
        res.send({ items: [] })
      }
      res.send(response.data)
    })
    .catch((err) => console.error('SEARCH_ERROR --> ', err))
}

module.exports = search
