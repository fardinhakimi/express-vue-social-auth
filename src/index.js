
const express = require('express')
const app = express()
const httpStatus = require('http-status-codes')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// Mongo db 
require('./config/db')()
// Passport
app.use(passport.initialize())
require('./config/passport')(passport)

// Routes 


app.use('/auth', require('./controllers/AuthController'))
app.use('/account', require('./controllers/AccountController'))

app.use('/', (req, res) => {
    res.status(httpStatus.OK).json({
        'Status': 'Alive'
    })
})
// Server 

const PORT = process.env.PORT || 3000

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`App running on port:${PORT}`);
    }
})