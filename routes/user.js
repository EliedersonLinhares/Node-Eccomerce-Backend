const express = require('express')

const router = express.Router()

router.get('/user', (req, res) => {
	res.json({
		data: 'Test api user endpoint',
	})
})

module.exports = router
