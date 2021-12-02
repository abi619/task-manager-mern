import express from 'express'
import { registerUser, loginUser } from '../controllers/userController.js'

const router = express.Router()

/*
    path= '/api/users/signup
    protected= false
*/
router.post('/signup', registerUser)
/*
    path= '/api/users/login
    protected= false
*/
router.post('/login', loginUser)

export default router