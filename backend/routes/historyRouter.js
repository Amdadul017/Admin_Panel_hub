const express = require("express")

const router = express.Router()

router.use(express.json())


const {
    createHistory,
    getHistoryByShopId,
    getHistoryByCategoryId,
    getHistoryByProductId
} = require('../controller/historyController')

router.post('/create', createHistory)
router.get('/byShopId/(:id)', getHistoryByShopId)
router.get('/byCategoryId/(:id)', getHistoryByCategoryId)
router.get('/byProductId/(:id)', getHistoryByProductId)


module.exports = router;