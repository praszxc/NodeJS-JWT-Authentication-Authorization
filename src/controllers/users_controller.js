const Users = require("../models/users_model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY
const { registerValidation } = require("../config/validation")


// REGISTER
const registerUser = async (req, res) => {
    
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message

    })

    const codeExist = await Users.findOne({code: req.body.code})
    if (codeExist) return res.status(400).json({
        message: "code already used"
    })
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const usersPost = new Users({
        email: req.body.email,
        name: req.body.name,
        code: req.body.code,
        password: hashPassword
    })

    try {
        const users = await usersPost.save()
        res.json(users)
    } catch (err) {
        res.status(400).json({
            message: "Gagal membuat user baru"
        })
    }
}

// LOGIN
const loginUser = async (req, res) => {

    const user = await Users.findOne({code: req.body.code})
    if (!user) return res.status(400).json({
        status: res.statusCode,
        message: "Wrong code"
    })

    const passValidation = await bcrypt.compare(req.body.password, user.password)
    if (!passValidation) return res.status(400).json({
        status: res.statusCode,
        message: "Wrong password"
    })

    const token = jwt.sign({_id: user._id}, SECRET_KEY)
    res.header("auth-token", token).json({
        token: token
    })
}

// READ
const getUser = async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users)
    } catch (err) {
        res.json({message: err})
    }
}

// UPDATE
const updateUser = async (req, res) => {
    try {
        const usersUpdate = await Users.updateOne({_id: req.params.usersId}, {
            name: req.body.name,
            code: req.body.code
        })
        res.json(usersUpdate)
    } catch (err) {
        res.json({message: err})
    }
}

// DELETE
const deleteUser = async (req, res) => {
    try {
        const usersDelete = await Users.deleteOne({_id: req.params.usersId}, {
            name: req.body.name,
            code: req.body.code
        })
        res.json(usersDelete)
    } catch (err) {
        res.json({message: err})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser
}