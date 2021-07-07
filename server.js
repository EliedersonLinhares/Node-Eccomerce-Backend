const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

//app
const app = express()

//db
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
	})
	.then(() => console.log('DB CONNECTED'))
	.catch((error) => console.log('DB CONNECT ERROR', error))

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '2mb' }))
app.use(cors())

//route
app.get('/api', (req, res) => {
	res.json({
		data: 'Test api node',
	})
})

//port
const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on port ${port}`))