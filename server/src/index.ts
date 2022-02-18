const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routes/auth.route')
const errorMiddleware = require('./middleware/error-middleware')
require('dotenv').config()

const app = express()

const PORT: string | number = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', authRouter)
app.use(errorMiddleware)

const DB_USER: string | undefined = process.env.DB_USER
const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD
const DB_NAME: string | undefined = process.env.DB_NAME

const DB_URL: string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.u08ng.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

async function start(): Promise<void> {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, (): void => {
            console.log(`Server started on port ${PORT}`);
            // console.log(process.env)
        })
    } catch (error) {
        console.log(error);
    }
}

start()