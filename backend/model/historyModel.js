const mongoose = require('mongoose')

const History = new mongoose.Schema(
    {
        category_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category" },
        product_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Products" },
        shop_id: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true,},
        quantity: {type: Number, required: true},
        price: { type: Number, required: true },
        customer_id: {type: String, required: true}
    },
    {
        timestamps: true
    },
    { collection: 'History' }
)

const model = mongoose.model('History', History)

module.exports = model