const express = require("express");
const mongoose = require("mongoose");
const Question = require('./models/question');
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

app.get('/all-questions', (req,res) => {
    //gets the data from mongoDb collection
    Question.find().then((result) => {
        res.send(result);
      //  res.json(Question);
    }).catch(
        (error) => {
            console.log(error);
        }
    );
} );

app.listen(8000, () => {
  console.log("port is listening");
});
