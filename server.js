import express from 'express'
import authRouter from './routes/Auth.js'
import userRouter from './routes/User.js'

import {config} from 'dotenv'

import path from 'path'
import mongoose from "mongoose"
import cookieParser from 'cookie-parser'

import session from 'express-session'
import flash from 'connect-flash'

config({
    path: "./.env"
})

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database Connection Successful')
    }
    catch(err){
        console.log(err)
    }
}

connectDB()

const PORT = process.env.PORT || 5500

const app = express()

app.use(session({
    secret:'zkjvhjkdsvvnhsudhvivhdsczjdshvis',
    saveUninitialized: true,
    resave:true
}))

app.use(flash())

app.use(express.static(path.join(path.resolve(), 'public')))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(cookieParser())

app.set('view engine', 'ejs')

app.use(authRouter)
app.use(userRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})