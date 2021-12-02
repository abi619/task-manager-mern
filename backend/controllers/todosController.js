import Todo from "../models/todosModel.js"
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"

const getTodos = asyncHandler(async (req, res) => {
    const fetchTodo = await Todo.findOne({user: req.user._id})
    res.status(200).send(fetchTodo)
})

const newTodos = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {todos} = req.body
    const getUser = await User.findById(req.user._id)
    if(getUser) {
        const getTodo = await Todo.findOne({user: getUser._id})
        if(getTodo) {
            getTodo.todos = todos
            await getTodo.save()
            res.send(getTodo)
        } else {
            const success = await Todo.create({
                user: getUser._id,
                todos
            })
            if(success) {
                res.status(200).send(success)
            } else {
                res.status(400).send('something went wrong')
            }
        }
    } else {
        res.status(404).send('user not found!!')
    }
})

export {getTodos, newTodos}