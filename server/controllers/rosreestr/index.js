const { ROSREEST_NET_API_KEY } = require('../../constants')
const hint = require('./hint')
const search = require('./search')
const getByEgrn = require('./getByEgrn')

const generateError = ({ res }) => {
  return res.status(404).send(`Wrong route params.`)
}

const rosreestr = (req, res) => {
  switch (req.params.type) {
    case 'hint':
      return hint(req, res)
    case 'search':
      return search(req, res)
    case 'getByEgrn':
      return getByEgrn(req, res, ROSREEST_NET_API_KEY)

    default:
      return generateError({ res })
  }
}

module.exports = rosreestr
