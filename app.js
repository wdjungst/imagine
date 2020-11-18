const express = require('express')
const logger = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')

// const users = require('./routes/users')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

const getAgents = (request, response) => {
  pool.query('SELECT * FROM agents', (error, result) => {
    if (error) {
      throw error
    }

    response.status(200).json(result.rows)
  })
}

app
  .route('/api/v1/agents')
  .get(getAgents)

module.exports = app
