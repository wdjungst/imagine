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
    `SELECT * FROM agents where id = ${id} LIMIT 1`, (error, result) => {
      if (error) {
        throw error
      }

      response.status(200).json(result ? result.rows[0] : {})
    })
}

const deleteAgent = (request, response) => {
  const { id } = request.params
  pool.query(
    `DELETE FROM agents WHERE id = ${id}`, (error, result) => {
      if (error) {
        throw error
      }

      response.status(200)
    })
}

const updateAgent = (request, response) => {
  const { id } = req.params
  const {
    firstName,
    lastName,
    email,
    phone,
    bio,
    url,
    imgUrl,
    website
  } = req.body

  const query = `UPDATE agents SET firstName=${firstName} lastName=${lastName} email=${email} phone=${phone} bio=${bio} url=${url} imgUrl=${imgUrl} website=${website} WHERE id = ${id}`
  pool.query(query, (error, result) => {
    if (error) {
      throw error
    }

    response.status(200)
  })
}

const getServices = (request, response) => {
  pool.query('SELECT * FROM services', (error, result) => {
    if (error) {
      throw error
    }

    response.status(200).json(result.rows)
  })
}

const addService = (request, response) => {
  const {
    name,
    url,
    phone,
    category
  } = request.body
    pool.query(
      'INSERT INTO services (name, url, phone, category) VALUES ($1, $2, $3, $4)',
      [name, url, phone, category],
      () => {
        response.status(201).json({ message: 'Service added' })
      }
    )
}

const updateService = (request, response) => {
  const { id } = req.params
  const {
    name,
    url,
    phone,
    category
  } = req.body

  const query = `UPDATE services SET name=${name} url=${url} phone=${phone} category=${category} WHERE id = ${id}`
  pool.query(query, (error, result) => {
    if (error) {
      throw error
    }

    response.status(200)
  })
}

const deleteService = (request, response) => {
  const { id } = request.params
  pool.query(
    `DELETE FROM services WHERE id = ${id}`, (error, result) => {
      if (error) {
        throw error
      }

      response.status(200)
    })
}

app
.route('/api/v1/agents')
.get(getAgents)
.post(addAgent)

app
.route('/api/v1/agents/:id')
.get(getAgent)
.put(updateAgent)
.delete(deleteAgent)

app.route('/api/v1/services')
   .get(getServices)
   .post(addService)

app.route('/api/v1/services/:id')
  .put(updateService)
  .delete(deleteService)

module.exports = app
