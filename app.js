const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();

const userRoutes = require("./routes/user");
const addressRoutes = require("./routes/address");

app.get("/", ( req, res )=>{
    res.send("Welcome to Street-Shopping...");
});

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }));
app.use( fileUpload() );
app.use( cookieParser() );

app.use("/api", userRoutes );
app.use("/api", addressRoutes );

app.listen( 3000, ()=>{
    console.log("App is running on 3000.....");
});