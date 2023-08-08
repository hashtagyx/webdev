import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var indexList = [];
var workList = [];
var date = new Date().toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric"});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const indexData = { 
    indexList: indexList,
    date: date,
  };
  res.render("index.ejs", indexData);
});

app.post("/submit", (req, res) => {
  indexList.push(req.body.task)
  const indexData = { 
    indexList: indexList,
    date: date,
  };
  res.sendStatus(200)
});

app.get("/work", (req, res) => {
  const workData = { workList: workList };
  res.render("work.ejs", workData);
});

app.post("/worksubmit", (req, res) => {
  workList.push(req.body.task)
  const workData = { 
    workList: workList,
  };
  res.sendStatus(200)
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
