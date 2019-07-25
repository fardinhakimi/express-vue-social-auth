const { Schema, model } = require('mongoose')

const userSchema = new Schema({

    email: {
        type: String,
        index: true,
        unique: true,
        dropDups: true,
        required: true,
    },
    googleId: {
        type: String
    },
    githubId: {
        type: String
    },
    googleProfileJson: {
        type: JSON
    },
    githubProfileJson: {
        type: JSON
    },
    name: {
        type: String
    }
})

module.exports = model('User', userSchema)