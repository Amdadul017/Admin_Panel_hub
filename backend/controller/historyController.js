const History = require("../model/historyModel")
const Category = require("../model/categoryModel")
const Product = require("../model/productModel")

const createHistory = async (req, res) => {
    console.log(req.body)
    const token = req.headers['x-access-token']
    if (token) {
        try {
            const newHistory = await History.create({
                category_id: req.body.category_id,
                quantity: req.body.quantity,
                price: req.body.price,
                product_id: req.body.product_id,
                customer_id: req.body.customer_id,
                shop_id: req.body.shop_id
            })
            const updatedCategory = await Category.updateOne({ _id: req.body.category_id }, {
                quantity: req.body.new_category_quantity,
            })
            const updateProduct = await Product.updateOne({_id: req.body.product_id},
                {quantity: req.body.new_product_quantity,}
            )
            return res.json({ status: 'ok', newHistoryInfo: newHistory })
        } catch (error) {
            res.json({ status: 'error', error: error })
        }
    } else {
        res.json({ status: 'error', error: 'User not logged in' })
    }
}

const getHistoryByShopId = async (req, res) => {
    const token = req.headers['x-access-token']
    if (token) {
        try {
            const shopId = req.params.id;
            const shopHistory = await History.find({ shop_id: shopId })

            return res.json({ status: 'ok', shopHistory: shopHistory })
        } catch (error) {
            res.json({ status: 'error', error: error })
        }
    } else {
        res.json({ status: 'error', error: 'User not logged in' })
    }
}

const getHistoryByCategoryId = async (req, res) => {
    const token = req.headers['x-access-token']
    if (token) {
        try {
            const categoryId = req.params.id;
            const categoryHistory = await History.find({ category_id: categoryId });

            return res.json({ status: 'ok', categoryHistory: categoryHistory })
        } catch (error) {
            res.json({ status: 'error', error: error })
        }
    } else {
        res.json({ status: 'error', error: 'User not logged in' })
    }
}

const getHistoryByProductId = async (req, res) => {
    const token = req.headers['x-access-token']
    if (token) {
        try {
            const productId = req.params.productId;
            const productHistory = await History.find({ product_id: productId });

            return res.json({ status: 'ok', productHistory: productHistory })
        } catch (error) {
            res.json({ status: 'error', error: error })
        }
    } else {
        res.json({ status: 'error', error: 'User not logged in' })
    }
}


module.exports = {
    createHistory,
    getHistoryByShopId,
    getHistoryByCategoryId,
    getHistoryByProductId
}