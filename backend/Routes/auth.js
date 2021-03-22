const router = require('express').Router()
const User = require('../models/User')
const bcyrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const signupValidation = require('../Validation/signupValidation')
const loginValidation = require('../Validation/loginValidation')

router.get('/',(req,res)=>{
    res.status(200).send('Hello World from auth route')
})

router.post('/register', async (req,res) => {

    const {errors, isValid} = signupValidation(req.body)

    if(!isValid){
        return res.status(400).send(errors)
    }

    const email_exists = await User.findOne({email: req.body.email})
    if(email_exists){
        errors.email = "Email already exists"
        return res.status(400).send(errors)
    }

    const salt = await bcyrpt.genSalt(10)
    const hashPassword = await bcyrpt.hash(req.body.password,salt)

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).send({user:newUser._id})
    } catch(err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req,res)=>{
    const {errors, isValid} = loginValidation(req.body)

    if(!isValid){
        return res.status(400).send(errors)
    }

    const user = await User.findOne({email:req.body.email})
    if(!user){
        errors.email = "User not found"
        return res.status(400).send(errors)
    }

    const validPass = await bcyrpt.compare(req.body.password,user.password)
    if(!validPass){
        errors.password = "Password is incorrect"
        return res.status(400).send(errors)
    }
    const tokenID = jwt.sign({_id:user._id,name:user.name}, process.env.TOKEN_SECRET)
    const token = JSON.stringify({tokenID:tokenID, id:user._id})
    res.header('auth-token',tokenID).send(token)
})

module.exports = router