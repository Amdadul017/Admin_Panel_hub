const mongoose = require('mongoose')

const Products = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image:{type: String},
        category_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category" },
        quantity: {type: Number, required: true},
        description: { type: String, required: false },
        price: { type: Number, required: true },
    },
    {
        timestamps: true
    },
    { collection: 'Products' }
)

const model = mongoose.model('Products', Products)

module.exports = model