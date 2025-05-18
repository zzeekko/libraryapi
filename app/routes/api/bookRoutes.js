const express = require('express')
const router = express.Router()

const { bookDao: dao } = require('../../daos/dao') 

router.get('/',( req, res)=> {
    dao.findAll(res, dao.table)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

router.post('/post', (req, res)=> {
    dao.create(req, res, dao.table)
})

router.patch('/patch/:id', (req, res) => {
    dao.patch(req, res, dao.table, req.params.id)
})

module.exports = router