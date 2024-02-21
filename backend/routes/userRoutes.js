const express = require("express")

const router = express.Router()

router.use(express.json())

const {
    registerUser,
    loginUser,
    getUser
} = require('../controller/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getUser', getUser)
//router.put('/(:id)', updateUser)



module.exports = router;