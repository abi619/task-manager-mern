import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import userRouter from './routes/userRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import path from 'path'

dotenv.config()
connectDB()
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

//initializing the express app
const app = express()
app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/todos', todoRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

//middlewares for handling the unknown routes or handling errors
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server started at port ${port}`)
})