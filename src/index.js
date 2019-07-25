
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

// Passport
require('./config/passport')(passport)
app.use(passport.initialize())

// Routes 

app.use('/', (req, res) => {
    res.status(httpStatus.OK).json({
        'Status': 'Alive'
    })
})

app.use('/auth/', require('./controllers/AuthController'))

// Server 

const PORT = process.env.PORT || 3000

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`App running on port:${PORT}`);
    }
})