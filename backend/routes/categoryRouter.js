const express = require("express")

const router = express.Router()

router.use(express.json())


const {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory
} = require('../controller/categoryController')

router.post('/create', createCategory)
router.get('/getAll/(:id)', getAllCategory)
router.get('/(:id)', getSingleCategory)
router.put('/update/(:id)', updateCategory)




module.exports = router;