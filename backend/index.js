import { MongoClient } from "mongodb";
import express from "express";

// const express = require("express");
// const mongoose = require("mongoose");
// // const Question = require('./models/question');
const app = express();

const uri = `mongodb+srv://user:dbuser@cluster0.b0xxkrk.mongodb.net/?retryWrites=true&w=majority`;



const client = new MongoClient(uri, { useUnifiedTopology: true }); // { useUnifiedTopology: true } removes connection warnings;

const database = client.db("expertsystem");
const ques = database.collection("questions");
const host = 'localhost';
const port = 8000;
var questionsArray = [];

async function run() {
    const cursor = ques.find({});


await cursor.forEach(document => 
    questionsArray.push(document.question)

);
}


run();
app.get('/all-questions', (req,res) => {
    res.send(questionsArray);
});


app.listen(8000, () => {
  console.log("port is listening");
});
