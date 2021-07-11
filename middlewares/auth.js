const admin = require('../firebase')
const user = require('../models/user')

exports.authCheck = async (req, res, next) => {
	try {
		const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
		//console.log('FIREBAS USER IN AUTHCHECK ', firebaseUser)
		req.user = firebaseUser
		next()
	} catch (error) {
		res.status(401).json({
			error: 'Invalid or expired token',
		})
	}
}

//checando se o usuario é administrador
exports.adminCheck = async (req, res, next) => {
	const { email } = req.user

	const adminUser = await user.findOne({ email }).exec()

	if (adminUser.role !== 'admin') {
		res.status(403).json({
			error: 'Admin resource. Acess denied',
		})
	} else {
		next()
	}
}
