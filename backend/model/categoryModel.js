const mongoose = require('mongoose')

const Category = new mongoose.Schema(
	{
		name: { type: String, required: true },
		shop_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Shop"},
		image: {type: String},
		quantity: {type: Number, required: true},
        max_capacity: {type: Number, required: false}
	},
    {
        timestamps: true
    },
	{ collection: 'Category' }
)

const model = mongoose.model('Category', Category)

module.exports = model