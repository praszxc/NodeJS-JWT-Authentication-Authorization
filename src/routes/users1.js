const express = require('express')
const router = express.Router()
const verifyToken = require("../routes/verify_token")
const UserController = require("../controllers/users_controller")


// REGISTER
router.post("/register", UserController.registerUser)

// LOGIN
router.post("/login", UserController.loginUser)

// READ
router.get("/", verifyToken, UserController.getUser)

// UPDATE
router.put("/:usersId", UserController.updateUser)

// DELETE
router.delete("/:usersId", UserController.deleteUser)

module.exports = router