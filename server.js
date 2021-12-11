if (process.env.NODE_ENV !== "production") {
    require("dotenv").parse()
}


const express = require("express");
const app = express();

const expressLayouts = require("express-ejs-layouts")

const indexRouter = require("./routes/index")

const mongoose = require("mongoose");
const nodemon = require("nodemon");
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
/** database config */
const db = mongoose.connection
db.on("error", error => console.log(error))
db.on("open", () => console.log("Connected to DB server"))

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")

app.use(expressLayouts);
app.use(express.static("public"))

app.use("/", indexRouter)

app.listen(process.env.PORT || 3000)
