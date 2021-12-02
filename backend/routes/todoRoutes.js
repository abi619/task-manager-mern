import express from 'express'
import {protect} from '../middleware/authMiddleware.js'
import {getTodos, newTodos} from '../controllers/todosController.js'

const router = express.Router()

router.post('/', protect, newTodos)
router.get('/', protect, getTodos)

export default router