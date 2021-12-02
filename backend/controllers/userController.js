import User from '../models/userModel.js'
import {generateToken} from '../utils/tokenGen.js'
import asyncHandler from 'express-async-handler'

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    const userExist = await User.findOne({email})
    if(userExist) {
        res.status(400)
        throw new Error('user alredy exist')
    }
    const newUser = await User.create({
        name,
        email, 
        password
    })
    if(newUser) {
        res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const userFound = await User.findOne({email})
    if(userFound && await userFound.isPasswordsMatch(password)) {
        res.status(200).json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            token: generateToken(userFound._id)
        })
    } else {
        res.status(401)
        throw new Error('invalid email or password')
    }
})


export {
    registerUser,
    loginUser
}