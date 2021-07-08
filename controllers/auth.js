const User = require('../models/user')

exports.createOrUpdateUser = async (req, res) => {
	const { name, picture, email } = req.user

	//Verificando se o usario existe no BD pelo email e atualizando a imagem e o nome caso tenham sido alterados
	const user = await User.findOneAndUpdate(
		{ email },
		{ name: email.split('@')[0], picture },
		{ new: true }
	)

	//Se é uma atualização  então faça o update
	if (user) {
		console.log('USER UPDATE', user)
		res.json(user)
	} else {
		// senão cria um novo usuario
		const newUser = await new User({
			email,
			name: email.split('@')[0],
			picture,
		}).save()
		console.log('USER CREATED', newUser)
	}
}

exports.currentUser = async (req, res) => {
	User.findOne({ email: req.user.email }).exec((error, user) => {
		if (error) throw new Error(error)
		res.json(user)
	})
}
