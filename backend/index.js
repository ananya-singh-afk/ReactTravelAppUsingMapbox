const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

dotenv.config();

const app = express();
app.use(express.json()); //this is the built-in express body-parser 
app.use(                //this mean we don't need to use body-parser anymore
  express.urlencoded({
    extended: true,
  })
);    

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB Connected!");
}).catch(err => console.log(err));

app.use("/api/pins", pinRoute); //http://localhost:8800/api/pins
app.use("/api/users", userRoute); //http://localhost:8800/api/users/login and http://localhost:8800/api/users/register

app.listen(8800, () => {
    console.log("backend server is running!!");
})