const mongoose = require("mongoose")
const usersSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 255
    },
    name: {
        type: String,
        required: true,
        max: 255
    },
    code: {
        type: String,
        required: true,
        max: 3
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("users", usersSchema)