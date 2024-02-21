const express = require("express")

const router = express.Router()

router.use(express.json())
const {
    createShop,
    getShop,
    updateShop
} = require('../controller/shopController')

router.post('/create', createShop)
router.get('/getShop', getShop)
router.put('/(:id)', updateShop)
//router.delete('/(:id)', deleteShop)





module.exports = router;