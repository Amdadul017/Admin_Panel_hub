const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Category = require("../model/categoryModel")

const createCategory = async (req, res) => {
    //console.log(req.body)
    const token = req.headers['x-access-token']

    if (token) {
        try {
            const newCategory = await Category.create({
                name: req.body.name,
                shop_id: req.body.shop_id,
                image: req.body.image,
                quantity: req.body.quantity,
                max_capacity: req.body.max_capacity
            })
            return res.json({ status: 'ok', newCategoryInfor: newCategory })
        } catch (error) {
            res.json({ status: 'error', error: error })
        }
    } else {
        res.json({ status: 'error', error: 'User not logged in' })
    }
}

const getAllCategory = async (req, res) => {
    const shop_id = req.params.id
    const token = req.headers['x-access-token']
    if (token) {
        try {
            const allCategory = await Category.find({ shop_id: shop_id })
            return res.json({ status: 'ok', allCategory: allCategory })
        } catch (error) {
            res.json({ status: 'error', error: error })
        }
    } else {
        res.json({ status: 'error', error: 'User not logged in' })
    }
}
const getSingleCategory = async (req, res) => {
    const category_id = req.params.id
    const token = req.headers['x-access-token']
    if (token) {
        try {
            const categoryInfo = await Category.findById({ _id: category_id }).populate('shop_id')
            return res.json({ status: 'ok', categoryInfo: categoryInfo })
        } catch (error) {
            res.json({ status: 'error', error: error })
        }
    } else {
        res.json({ status: 'error', error: 'User not logged in' })
    }
}
const updateCategory = async (req, res) => {
    const category_id = req.params.id
    const token = req.headers['x-access-token']
    if (token) {
        try {
            const updatedCategory = await Category.updateOne({ _id: category_id }, {
                name: req.body.name,
                quantity: req.body.quantity,
                max_capacity: req.body.max_capacity
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
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory
}