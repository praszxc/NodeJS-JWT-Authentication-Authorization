require("dotenv").config()
const express = require("express")
const app = express();
const PORT = process.env.PORT || 5000
const DB_CONNECTION = process.env.DB_CONNECTION
const users1Routes = require("./routes/users1")
const midlogRequest = require("./middleware/logs")
const mongoose = require("mongoose")
app.use(midlogRequest)
app.use(express.json())
app.use("/api/users", users1Routes)

mongoose.connect(DB_CONNECTION)
let db = mongoose.connection
db.on("error", console.error.bind(console, "db connection error"))
db.once("open", () => {
    console.log("db connection success")
})

app.listen(PORT, () => {
    console.log(`Server successfully running at port ${PORT}`)
})