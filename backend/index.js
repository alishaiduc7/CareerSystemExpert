import { MongoClient } from "mongodb";
import express from "express";

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

app.get('/all-questions', (req, res) => {
  const questionList = questionsArray.map(question => `
    <li>
      ${question}
      <form>
        <label>
          <input type="radio" name="${question}" value="yes">
          Yes
        </label>
        <label>
          <input type="radio" name="${question}" value="no">
          No
        </label>
      </form>
    </li>
  `).join('');
  
  const html = `<ul style="list-style: none; padding: 0">${questionList}</ul>`;
  const css = `li {margin-bottom: 10px;}
  body {
    text-align: center;
  }`; 

  res.send(`
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `);
});




app.listen(8000, () => {
  console.log("port is listening");
});
