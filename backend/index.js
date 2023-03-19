const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri = `mongodb+srv://user:dbuser@cluster0.b0xxkrk.mongodb.net/?retryWrites=true&w=majority`;

async function connect( ) {
 try {
    await mongoose.connect(uri);
    console.log("Connected to DB");
 }  catch (error) {
    console.error(error);
 } 
}
    // dotenv.config({path: 'backend/config/config.env'});
connect();
// connectDB;


app.listen(8000, () => {
  console.log("port is listening");
});
