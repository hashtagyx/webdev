import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  var length = req.body.fName.length + req.body.lName.length;
  var data = {}
  if (length === 1) {
    data = {
      title: "There is 1 letter in your name."
    };
  } else {
    data = {
      title: `There are ${length} letters in your name.`
    };
  };
  res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
