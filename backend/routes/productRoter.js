const express = require("express")

const router = express.Router()

router.use(express.json())

const {
    addProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require('../controller/productController')

router.post('/addProduct', addProduct)
router.get('/getAll/(:id)', getAllProduct)
router.get('/getSingle/(:id)', getSingleProduct)
router.put('/update/(:id)', updateProduct)
router.delete('/delete/(:id)', deleteProduct)

module.exports = router;