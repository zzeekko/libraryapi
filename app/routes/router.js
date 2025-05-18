const express = require('express')
const router = express.Router()
const axios = require('axios')

const PORT = process.env.PORT || 4000

router.use(express.static('public'))

const endpoints = ['book', 'author', 'publisher', 'genre', 'format']

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})

module.exports = router