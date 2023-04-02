import { MongoClient } from "mongodb";
import express from "express";
import JSDOM from "jsdom"
import bodyParser from 'body-parser';


const app = express();

const uri = `mongodb+srv://user:dbuser@cluster0.b0xxkrk.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useUnifiedTopology: true }); // { useUnifiedTopology: true } removes connection warnings;

const database = client.db("expertsystem");
const ques = database.collection("questions");
const rules = database.collection("rules");
const carreers = database.collection("careers");

const host = 'localhost';
const port = 8000;
var questionsArray = [];
var traitsArray = [];
var rulesList = [];
var careersList = [];
var numberOfQuestions = 0;

async function run() {
    const cursor = ques.find({});
await cursor.forEach(document => {
    questionsArray.push(document.question); 
    traitsArray.push(document.trait);  
  }
);
  numberOfQuestions = questionsArray.length;
}

async function getCareers() {
  const getCareer = carreers.find({});
await getCareer.forEach(document => {
  careersList.push(document.career); 
}
);
}


run();
getCareers();
var k = 0;
async function getRules() {
  for (let _id = 1; ; _id++) {
    const document = await rules.findOne({ _id });
    if (document != null) {
      const str = document.rule;
      const matches = str.match(/\[(.*?)\]/);
      if (matches) {
        const contents = matches[1];
        const arr = contents.split(",");
        rulesList.push(arr);
      }
    }
  
  }
}

getRules();

app.get('/', (req, res) => {
  const html = `
    <html>
      <head>
        <style>
          body {
            background-color: #f5f5ed;
            text-align: center;
          }
          h1 {
            margin-top: 50px;
          }
          .navbar {
            background-color: #455843;
            overflow: hidden;
          }
          .navbar a {
            float: left;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
          }
          .navbar a:hover {
            background-color: #b4c7ab;
            color: black;
          }
          .quiz-container {
            margin-top: 50px;
          }
          .quiz-button {
            padding: 16px 32px;
            font-size: 24px;
            font-weight: bold;
            text-transform: uppercase;
            border-radius: 50px;
            background-color: #bca597;
            color: #ffffff;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease-in-out;
          }
          .quiz-button:hover {
            background-color: #a37c6c;
            box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
          }
          li {
            margin-bottom: 10px;
          }
          
        </style>
      </head>
      <body>
        <div class="navbar">
          <a href="/">Home</a>
          <a href="/all-questions">Quiz</a>
        </div>
        <div class="home-container">
          <h1>Complete the quiz and find out the most appropriate career for you!</h1>
          <div>
          <button class="quiz-button" onclick="location.href='/all-questions'" style="margin: 50px;">Start Quiz</button>
        </div>        
        </div>
      </body>
    </html>
  `;

  res.send(html);
});

app.get('/all-questions', (req, res) => {
  const questionList = questionsArray.map(question => `
    <li>
      ${question}
      <div>
        <label>
          <input type="radio" name="${question}" value="yes">Yes
        </label>
        <label>
          <input type="radio" name="${question}" value="no">No
        </label>
      </div>
    </li>
  `).join('');

  const html = `
    <html>
      <head>
        <style>
          body {
            background-color: #f5f5ed;
            text-align: center;
          }
          h1 {
            margin-top: 50px;
          }
          .navbar {
            background-color:#455843;
            overflow: hidden;
          }
          .navbar a {
            float: left;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
          }
          .navbar a:hover {
            background-color: #b4c7ab;
            color: black;
          }
          .quiz-container {
            margin-top: 50px;
          }
          li {
            margin-bottom: 10px;
          }
          input[type="radio"] {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            height: 20px;
            width: 20px;
            border: 2px solid #ccc;
            border-radius: 50%;
            outline: none;
            transition: all 0.2s ease-in-out;
          }
          input[type="radio"]:checked {
            background-color:#bca597;
            border-color:#a37c6c;
          }
          input[type="radio"] + span {
            margin-left: 10px;
            font-size: 16px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="navbar">
          <a href="/">Home</a>
          <a href="/all-questions">Quiz</a>
        </div>
        <div class="quiz-container">
          <h1>Quiz Questions</h1>
          <form action="/submit-quiz" method="post">
            <ul style="list-style: none; padding: 0">${questionList}</ul>
            <button type="submit">Submit</button>
          </form>
        </div>
      </body>
    </html>
  `;

  res.send(html);
});
function checkElementsinArray(fixedArray,inputArray)
{
    var fixedArraylen = fixedArray.length;
    var inputArraylen = inputArray.length;
    if(fixedArraylen<=inputArraylen)
    {
        for(var i=0;i<fixedArraylen;i++)
        {
            if(!(inputArray.indexOf(fixedArray[i])>=0))
            {
                return false;
            }
        }
    }
    else
    {
        return false;
    }
    return true;
}

// let checker = (arr, target) => target.every(v => arr.includes(v));
var listOfTraits = [];
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-quiz', (req, res) => {
  const answers = req.body; 
  const values = Object.values(answers);
  if(values.length == numberOfQuestions) {
    //here we'll create a bond between answers and traits
   var counter = 0;
   traitsArray.forEach(doc => {
    if(values[counter] == 'yes') {
        listOfTraits.push(doc);
    }
    counter++;
   })
  }
 
  var i = 0;
  var career = "career";

 rulesList.forEach(rule => {
    if(i==0) {
    }
    if(checkElementsinArray(rule, listOfTraits))
      {
    career = careersList[i];
    res.send(
      `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Quiz Results</title>
          <style>
            body {
              background-color: #f5f5ed; 
            }
            h1 {
              margin-top: 50px;
            }
            .result {
              background-color: white;
              padding: 20px;
              border-radius: 10px; 
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
              max-width: 500px;
              margin: 0 auto; 

              text-align: center; 
            }
            .navbar {
              background-color:#455843;
              overflow: hidden;
            }
            .navbar a {
              float: left;
              color: white;
              text-align: center;
              padding: 14px 16px;
              text-decoration: none;
            }
            .navbar a:hover {
              background-color: #b4c7ab;
              color: black;
            }
            }
          </style>
        </head>
        <body>
        <div class="navbar">
        <a href="/">Home</a>
        <a href="/all-questions">Quiz</a>
      </div>
          <div class="result">
            <h2>Your recommended career:</h2>
            <p>${career}</p>
          </div>
        </body>
        </html>
      `);
      return;
    
      }
  i++;
 })
 

});

app.listen(8000, () => {
  console.log("port is listening");
});
