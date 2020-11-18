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

const addAgent = (request, response) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    bio = null,
    url,
    imgUrl = null,
    agentHeaderId,
    website = null,
  } = request.body
  pool.query(
    'INSERT INTO agents (firstName, lastName, email, phone, bio, url, imgUrl, agentHeaderId, website) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [firstName, lastName, email, phone, bio, url, imgUrl, agentHeaderId, website],
    () => {
      response.status(201).json({ message: 'Agent added' })
    }
  )
}

const getAgent = (request, response) => {
  const { id } = request.params
  pool.query(
    `SELECT * FROM agents where id = ${id} LIMIT 1`, (error, result, data) => {
      if (error) {
        throw error
      }

      response.status(200).json(result ? result.rows[0] : {})
    })
}

app
  .route('/api/v1/agents')
  .get(getAgents)
  .post(addAgent)

app
  .route('/api/v1/agents/:id')
  .get(getAgent)

module.exports = app
