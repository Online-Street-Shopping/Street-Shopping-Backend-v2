const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();

const userRoutes = require("./routes/user");
const addressRoutes = require("./routes/address");
const authenticationRoutes = require("./routes/authentication");
const marketRoutes = require("./routes/market");
const productRoutes = require("./routes/product");
const shopRoutes = require("./routes/shop");
const orderRoutes = require("./routes/order");
const mediaRoutes = require("./routes/media");

const feedbackRoutes = require("./routes/feedback");
const feedbackDetailRoutes = require("./routes/feedbackDetail");
const stateRoutes =  require("./routes/state");
const cityRoutes = require("./routes/city");
const roleRoutes = require("./routes/role");
const pincodeRoutes = require("./routes/pincode");
const cardRoutes = require("./routes/card");
const categoryRoutes = require("./routes/category");
const subCategoryRoutes = require("./routes/subCategory")
const subscriptionRoutes = require("./routes/subscription");
const buySubscriptionRoutes = require("./routes/buySubscription");
const deliveryRoutes = require("./routes/delivery")

app.get("/", ( req, res )=>{
    res.send("Welcome to Street-Shopping...");
});

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }));
app.use( fileUpload() );
app.use( cookieParser() );

app.use("/api", userRoutes );
app.use("/api", addressRoutes );
app.use("/api", authenticationRoutes );
app.use("/api", marketRoutes );
app.use("/api", productRoutes );
app.use("/api", shopRoutes );
app.use("/api", orderRoutes );
app.use("/api", mediaRoutes );

app.use("/api", feedbackRoutes);
app.use("/api", feedbackDetailRoutes);
app.use("/api", stateRoutes);
app.use("/api", cityRoutes);
app.use("/api", roleRoutes);
app.use("/api", pincodeRoutes);
app.use("/api", cardRoutes );
app.use("/api", categoryRoutes );
app.use("/api", subCategoryRoutes );
app.use("/api", subscriptionRoutes );
app.use("/api", buySubscriptionRoutes );
app.use("/api", deliveryRoutes );

app.listen( process.env.PORT || 3000, ()=>{
    console.log("App is running on 3000.....");
});