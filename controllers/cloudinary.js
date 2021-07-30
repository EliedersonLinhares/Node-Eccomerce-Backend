const cloudinary = require('cloudinary')

//config
cloudinary.config({
	cloud_name: process.env.CLOUIDNARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

exports.upload = async (req, res) => {
	let result = await cloudinary.uploader.upload(req.body.image, {
		public_id: `${Date.now()}`, //name
		resource_type: 'auto', //jpeg,png...
	})
	//response
	res.json({
		public_id: result.public_id,
		url: result.secure.url,
	})
}

exports.remove = (req, res) => {
	let image_id = req.body.public_id

	cloudinary.uploader.destroy(image_id, (err, result) => {
		if (err) return res.json({ sucess: false, err })
		res.send('ok')
	})
}
