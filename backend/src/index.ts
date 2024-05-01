
import express from 'express'
import { configureRoutes } from './routes/route'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressSession  from 'express-session'
import passport from 'passport'
import { configurePassport } from './passports/passport'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
const port = 5000
const dbUrl = 'mongodb://localhost:6000/my_db'

//mongo connect
mongoose.connect(dbUrl).then((data) => {
    console.log("Connected to database")
}).catch(err => {
    console.log(err)
    return
})

const whitelist = ['http://localhost:4200'] 
const corsOptions ={
    origin: (origin: string | undefined, callback: (er: Error | null, allowed?: boolean) => void) =>{
        if (whitelist.indexOf(origin!) !== -1) {
            callback(null, true)
        }else{
            callback(new Error("Not allowed by CORS"))
        }
    }
}
app.use(cors(corsOptions))

// bodyParser
app.use(bodyParser.urlencoded({extended: true}))

// cookieParser
app.use(cookieParser())

// session
const sessionOptions: expressSession.SessionOptions = {
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
}
app.use(expressSession(sessionOptions))

app.use(passport.initialize())
app.use(passport.session())

configurePassport(passport)

app.use('/app', configureRoutes(passport, express.Router()))

app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString())
})

console.log('After server is ready.')