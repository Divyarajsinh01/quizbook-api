const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { fail } = require('assert')

const router = express.Router()

router.post('/users/signup', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).json({
            status: "sucess",
            Details: user
        })
    } catch (e) {
        // console.log(e)
        res.status(400).json({
            status: "fail",
            error : e.message
        })
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.json({
            status: "sucessfully login",
            Details: user
        })
        // console.log(user)
    } catch (error) {
        // console.log(error.message)
        res.status(400).json({
            status : fail,
            error: error.message
        })
    }
})

module.exports = router