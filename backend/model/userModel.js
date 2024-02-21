const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		image: {type: String}		
	},
    {
        timestamps: true
    },
	{ collection: 'User' }
)

const model = mongoose.model('User', User)

module.exports = model