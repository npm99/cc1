require('dotenv').config()
require('log-timestamp')
const _ = require('lodash')
const express = require('express')
const next = require('next')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = app.getRequestHandler()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const { apis, request } = require('@shopstack/cc-admin-lib/server')

const PORT = process.env.PORT || 3000

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(cookieParser())
    server.use(bodyParser.urlencoded({
      extended: true
    }))
    server.use(bodyParser.json({
      type: 'application/json',
      limit: '100mb'
    }))
    server.set('trust proxy', true)
    server.get('/health_check', (req, res) => {
      res.json({ message: 'ok' })
    })

    const setAbout = async () => {
      try {
        await request.setAbout()
      }
      catch (e) {
        console.log('setAbout error: ', e)
      }
    }
    setAbout()

    apis(server)

    server.get(
      '*',
      (req, res) => {
        req.env = {
          ENV: process.env.NODE_ENV,
          PORT: process.env.PORT,
          API_GATEWAY: process.env.API_GATEWAY,
          API_GATEWAY_MEDIA: process.env.API_GATEWAY_MEDIA,
          API_DOCUMENT_URL: process.env.API_DOCUMENT_URL,
          GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY,
          EDITOR_LICENSE_KEY: process.env.EDITOR_LICENSE_KEY,
          COOKIE_SECURE: process.env.COOKIE_SECURE,
          COOKIE_HTTP_ONLY: process.env.COOKIE_HTTP_ONLY,
          COOKIE_SAME_SITE: process.env.COOKIE_SAME_SITE
        }
        return handler(req, res)
      }
    )

    server.listen(PORT, (err) => {
      if (err) throw err
      console.log('Server start on port : ', PORT)
      console.log('Start on mode : ', process.env.NODE_ENV)
    })
  })
