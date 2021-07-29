const express = require('express')

const router = express.Router()

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

//controller
const {
	create,
	read,
	update,
	remove,
	list,
	getSubs,
} = require('../controllers/sub')

//routes
router.post('/sub', authCheck, adminCheck, create)
router.get('/subs', list)
router.get('/sub/:slug', read)
router.put('/sub/:slug', authCheck, adminCheck, update)
router.delete('/sub/:slug', authCheck, adminCheck, remove)
//
router.get('/category/subs/:_id', getSubs)

module.exports = router
