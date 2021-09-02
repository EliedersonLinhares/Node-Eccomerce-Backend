const Product = require('../models/product')
const slugify = require('slugify')

exports.create = async (req, res) => {
	try {
		console.log(req.body)
		req.body.slug = slugify(req.body.title)
		const newProduct = await new Product(req.body).save()
		res.json(newProduct)
	} catch (err) {
		//res.status(400).send('Create product failed')
		res.status(400).json({
			err: err.message,
		})
	}
}

exports.listAll = async (req, res) => {
	let products = await Product.find({})
		.limit(parseInt(req.params.count))
		.populate('category')
		.populate('subs')
		.sort([['createdAt', 'desc']])
		.exec()
	res.json(products)
}

exports.remove = async (req, res) => {
	try {
		const deleted = await Product.findOneAndRemove({
			slug: req.params.slug,
		}).exec()
		res.json(deleted)
	} catch (err) {
		console.log(err)
		return res.staus(400).send('Product delete failed')
	}
}

exports.read = async (req, res) => {
	const product = await Product.findOne({ slug: req.params.slug })
		.populate('category')
		.populate('subs')
		.exec()
	res.json(product)
}

exports.update = async (req, res) => {
	try {
		if (req.body.title) {
			req.body.slug = slugify(req.body.title)
		}
		const updated = await Product.findOneAndUpdate(
			{ slug: req.params.slug },
			req.body,
			{ new: true }
		).exec()
		res.json(updated)
	} catch (err) {
		console.log('PRODUCT UPDATE ERROR ----->', err)
		//return res.staus(400).send('Product update failed')
		res.status(400).json({
			err: err.message,
		})
	}
}

//Without pagination
/** 
exports.list = async (req, res) => {
	try {
		//sort -> createdAt or updatedAt
		//order -> desc or asc
		//limit -> 3,4,5...
		const { sort, order, limit } = req.body
		const products = await Product.find({})
			.populate('category')
			.populate('subs')
			.sort([[sort, order]])
			.limit(limit)
			.exec()

		res.json(products)
	} catch (errr) {
		console.log(err)
	}
}
*/
//With Pagination
exports.list = async (req, res) => {
	try {
		//sort -> createdAt or updatedAt
		//order -> desc or asc
		//limit -> 3,4,5...
		const { sort, order, page } = req.body
		const currentPage = page || 1
		const perPage = 3

		const products = await Product.find({})
			.skip((currentPage - 1) * perPage)
			.populate('category')
			.populate('subs')
			.sort([[sort, order]])
			.limit(perPage)
			.exec()

		res.json(products)
	} catch (errr) {
		console.log(err)
	}
}

exports.productsCount = async (req, res) => {
	let total = await Product.find({}).estimatedDocumentCount().exec()
	res.json(total)
}

exports.productStar = async (req, res) => {
	const product = await Product.findById(re.params.productId).exec()
	const user = await User.findOne({ email: req.user.email }).exec()
	const { star } = req.body

	//who is updating
	//check if currently logged in user have already added rating to this product
	let existingRatingObject = product.ratings.find(
		(ele) => ele.postedBy.toString() === user._id.toString()
	)

	//if user haven't left rating, push it
	if (existingRatingObject === undefined) {
		let ratingAdded = await Product.findByIdAndUpdate(
			product._id,
			{
				$push: { ratings: { star, postedBy: user._id } },
			},
			{ new: true }
		).exec()
		console.log(ratingAdded)
		res.json(ratingAdded)
	} else {
		//if user have already left rating, update it
		const ratingUpdate = await Product.updateOne(
			{
				rating: { $elementMatch: existingRatingObject },
			},
			{ $set: { 'ratings.$.star': start } },
			{ new: true }
		).exec()
		console.log(ratingUpdate)
		res.json(ratingUpdate)
	}
}
