const express = require('express')
const router = express.Router()

const { publisherDao: dao } = require('../../daos/dao')

router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table)
})

router.get('/books/:publisher_id', (req, res)=> {
    dao.findBookByPublisher(res, dao.table, req.params.publisher_id)
})

router.post('/post', (req, res)=> {
    dao.create(req, res, dao.table)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router