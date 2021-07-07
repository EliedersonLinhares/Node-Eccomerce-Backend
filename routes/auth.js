const express = require('express')

const router = express.Router()

router.get('/create-or-update-user', (req, res) => {
	res.json({
		data: 'Test api create-or-update-user endpoint',
	})
})

module.exports = router
