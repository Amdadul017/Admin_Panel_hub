const mongoose = require('mongoose')

const Shop = new mongoose.Schema(
	{
		name: { type: String, required: true },
		owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true},
		image: {type: String},
        location: { type: String, required: false},	
        description: { type: String, required: false},
	},
    {
        timestamps: true
    },
	{ collection: 'Shop' }
)

const model = mongoose.model('Shop', Shop)


module.exports = model