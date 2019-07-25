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
        type: String,
        unique: true
    },
    githubId: {
        type: String,
        unique: true
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

userSchema.methods.getId = function () {
    return this._id
}

module.exports = model('User', userSchema)