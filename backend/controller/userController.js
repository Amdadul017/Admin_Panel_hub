const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require("../model/userModel")

const registerUser = async (req, res) => {
    const newPassword = await bcrypt.hash(req.body.password, 10)
    //console.log(newPassword);
    //image: "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/" + req.body.image + ".jpg",
    
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            image: req.body.image,
        })
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', user: false })
    }
}

const loginUser = async (req, res) => {
    //console.log(req.body)
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        return { status: 'error', error: 'User not found' }
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    )

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            'emdad1234'
        )

        return res.json({ status: 'ok', userData: user, token: token })
    } else {
        return res.json({ status: 'error', user: "Couldn't login user" })
    }
}
const getUser = async (req, res) => {
    const token = req.headers['x-access-token']
    if (token) {
        try {
            const decoded = jwt.verify(token, 'emdad1234')
            const email = decoded.email
            console.log(decoded.id)
            const user = await User.findOne({ email: email })
            if(user){
                return res.json({ status: 'ok',userData: user })
            }else{
                res.json({ status: 'error', error: 'User not found' })
            }
            
        } catch (error) {
            console.log(error)
            res.json({ status: 'error', error: error })
        }
    } else {
        res.json({ status: 'error', error: 'invalid token hr' })
    }

}
module.exports = {
    registerUser,
    loginUser,
    getUser
}
