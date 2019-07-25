
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


// Server 

const PORT = process.env.PORT || 3000

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`App running on port:${PORT}`);
    }
})