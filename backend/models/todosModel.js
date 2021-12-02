import mongoose from 'mongoose'

const todoSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        todos: [{
            text: {
                type: String,
                required: true
            },
            status: {
                type: Boolean,
                required: true
            },
            date: {
                type: Date,
                required: true
            }
        }]
    },
    {timestamps: true}
)

const Todo = mongoose.model('Todo', todoSchema)

export default Todo