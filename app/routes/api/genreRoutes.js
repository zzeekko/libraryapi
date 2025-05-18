const express = require('express')
const router = express.Router()

const { genreDao: dao } = require('../../daos/dao')

router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table)
})

router.get('/books/:genre_id', (req, res)=> {
    dao.findBookByGenre(res, dao.table, req.params.genre_id)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router