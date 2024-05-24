const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Shop = require("../model/shopModel")
const User = require("../model/userModel")

const createShop = async (req, res) => {
    console.log(req.body)
    const token = req.headers['x-access-token']
    if (token) {
        const decoded = jwt.verify(token, 'emdad1234')
        try {
            const newShop = await Shop.create({
                name: req.body.name,
                owner: decoded.id,
                image: req.body.image,
                location: req.body.location,
                description: req.body.description
            })
            return res.json({ status: 'ok', shopInfo: newShop })
        } catch (error) {
            res.json({ status: 'error', error: error })
        }
    } else {
        res.json({ status: 'error', error: 'User not logged in' })
    }
}

const getShop = async (req, res) => {
    //console.log(req.body)
    const token = req.headers['x-access-token']
    if (token) {
        const decoded = jwt.verify(token, 'emdad1234')
        const shop = await Shop.findOne({ owner: decoded.id }).populate('owner')
        return res.json({ status: 'ok', shopInfo: shop })
    } else {
        res.json({ status: 'error', error: 'User not logged in' })
    }
}

const updateShop = async (req, res) => {
    console.log(req.body)
    const id = req.params.id;
    const token = req.headers['x-access-token']
    if (token) {
        const decoded = jwt.verify(token, 'emdad1234')
        try {
            const updatedShop = await Shop.updateOne({_id:id},{
                name: req.body.name,
                location: req.body.location,
                description: req.body.description
            })
            return res.json({ status: 'ok' })
        } catch (error) {
            res.json({ status: 'error', error: error })
        }
    } else {
        res.json({ status: 'error', error: 'User not logged in' })
    }
}


module.exports = {
    createShop,
    getShop,
    updateShop
}