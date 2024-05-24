const Product = require("../model/productModel")
const Category = require("../model/categoryModel")

const addProduct = async (req, res) => {
    console.log(req.body)
    const token = req.headers['x-access-token']
    if (token) {
        try {
            const newProduct = await Product.create({
                name: req.body.name,
                image: req.body.image,
                category_id: req.body.category_id,
                quantity: req.body.quantity,
                price: req.body.price,
                description: req.body.description
            })
            const updatedCategory = await Category.updateOne({ _id: req.body.category_id }, {
                quantity: req.body.new_category_quantity,
            })
            return res.json({ status: 'ok', newproductInfo: newProduct })
        } catch (error) {
            res.json({ status: 'error', error: error })
        }
    } else {
        res.json({ status: 'error', error: 'User not logged in' })
    }
}
const getAllProduct = async (req, res) => {
    const category_id = req.params.id
    const token = req.headers['x-access-token']
    if (token) {
        try {
            const allProduct = await Product.find({ category_id: category_id })
            const categoryInfo = await Category.findById({ _id: category_id })
            return res.json({ status: 'ok', categoryInfo: categoryInfo, allProduct: allProduct })
        } catch (error) {
            res.json({ status: 'error', error: error })
        }
    } else {
        res.json({ status: 'error', error: 'User not logged in' })
    }
}
const getSingleProduct = async (req, res) => {
    const product_id = req.params.id
    const token = req.headers['x-access-token']
    if (token) {
        try {
            const productInfo = await Product.findOne({ _id: product_id })
            return res.json({ status: 'ok', productInfo: productInfo })
        } catch (error) {
            res.json({ status: 'error', error: error })
        }
    } else {
        res.json({ status: 'error', error: 'User not logged in' })
    }
}
const updateProduct = async (req, res) => {
    const product_id = req.params.id
    console.log(req.body)
    const token = req.headers['x-access-token']
    if (token) {
        try {
            const productInfo = await Product.updateOne({ _id: product_id }, {
                name: req.body.name,
                quantity: req.body.quantity,
                price: req.body.price,
                description: req.body.description
            })
            const updatedCategory = await Category.updateOne({ _id: req.body.category_id }, {
                quantity: req.body.new_category_quantity,
            })
            return res.json({ status: 'ok' })
        } catch (error) {
            res.json({ status: 'error', error: error })
        }
    } else {
        res.json({ status: 'error', error: 'User not logged in' })
    }
}

const deleteProduct = async (req, res) => {
    const product_id = req.params.id;
    const token = req.headers['x-access-token'];

    if (token) {
        try {
            // Extract data from the query parameters
            const category_id = req.query.category_id;
            const new_category_quantity = req.query.new_category_quantity;

            // Update the category
            const updatedCategory = await Category.updateOne({ _id: category_id }, {
                quantity: new_category_quantity
            });

            // Delete the product
            const productDelete = await Product.findByIdAndDelete(product_id);

            return res.json({ status: 'ok' });
        } catch (error) {
            res.json({ status: 'error', error: error });
        }
    } else {
        res.json({ status: 'error', error: 'User not logged in' });
    }
}


module.exports = {
    addProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}