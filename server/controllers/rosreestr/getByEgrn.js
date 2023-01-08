const axios = require('axios')

const getByEgrn = (req, res, API_KEY) => {
  axios
    .get('https://rosreestr.net/api/method/service.getByEgrn', {
      params: {
        egrn: req.body.query,
        access_token: API_KEY,
        v: '1.0'
      }
    })
    .then((res) => {
      return '202'
    })
    .catch((err) => console.error('GET_ERROR --> ', err))
}

module.exports = getByEgrn
