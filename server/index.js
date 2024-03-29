const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser')
const { Nuxt, Builder } = require('nuxt')
const db = require('./models')

const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const routes = require('./routes')

async function start () {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(routes)
  app.use('/api', routes)

  app.post('/api/clients', (req, res) => {
    const { name, email, phone } = req.body

    return db.Clients.create({ name, email, phone })
      .then((contact) => res.send(contact))
      .catch((err) => {
        return res.status(400).send(err)
      })
  })
  app.post('/api/transactions', (req, res) => {
    const { email, status, reason = '', price } = req.body

    return db.Transactions.create({
      email,
      status,
      reason,
      price
    })
      .then((contact) => res.send(contact))
      .catch((err) => {
        return res.status(400).send(err)
      })
  })
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
