const express = require('express')
const router = express.Router()

const { authorDao: dao } = require('../../daos/dao')

router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table)
})

router.get('/books/:author_id', (req, res)=> {
    dao.findBookByAuthor(res, dao.table, req.params.author_id)
})

router.post('/post', (req, res)=> {
    dao.create(req, res, dao.table)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router