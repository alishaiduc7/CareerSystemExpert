import { MongoClient } from "mongodb";
import express from "express";

// const express = require("express");
// const mongoose = require("mongoose");
// // const Question = require('./models/question');
const app = express();

const uri = `mongodb+srv://user:dbuser@cluster0.b0xxkrk.mongodb.net/?retryWrites=true&w=majority`;

// async function connect( ) {
//  try {
//     await mongoose.connect(uri);
//     console.log("Connected to DB");
//  }  catch (error) {
//     console.error(error);
//  } 
// }
    // dotenv.config({path: 'backend/config/config.env'});
//connect();
// connectDB;
// const MongoClient = require("mongodb").MongoClient;

// Connection url

const client = new MongoClient(uri, { useUnifiedTopology: true }); // { useUnifiedTopology: true } removes connection warnings;
// connect();
//const dbName = "expertsystem";
const database = client.db("expertsystem");
const ques = database.collection("questions");

// const document = await ques.findOne({});
// console.log(document._id);
async function run() {
    const cursor = ques.find({});
await cursor.forEach(document => console.log(document.question));
}
//app.get('/all-questions', (req,res) => {
    // res.send(result);
        //gets the data from mongoDb collection
      
run();
  //  } );
// async function run() {
//     const cursor = ques.find({});
// await cursor.forEach(document => console.log(document.question));
// }
// run();

// const cursor = ques.find({});
// await cursor.forEach(document => console.log(document._id));

// async function run() {
//     try {
// if ((await ques.countDocuments(query)) === 0) {
//     console.log("No documents found!");
//   }
//   // replace console.dir with your callback to access individual elements
//   await cursor.forEach(console.dir);
//     } finally {
//         await client.close();
//       } }

//       run().catch(console.dir);
// client
//       .connect()
//       .then(
//         client =>
//           client
//             .db(dbName)
//             .listCollections()
//             .toArray() // Returns a promise that will resolve to the list of the collections
//       )
//       .then(cols => console.log("Questions", cols))
//       .finally(() => client.close());



// app.get('/all-questions', (req,res) => {
//     //gets the data from mongoDb collection
//     Question.find().then((result) => {
//         res.send(result);
//       //  res.json(Question);
//     }).catch(
//         (error) => {
//             console.log(error);
//         }
//     );
// } );

// app.listen(8000, () => {
//   console.log("port is listening");
// });
