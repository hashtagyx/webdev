import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  var pet = req.body.pet;
  pet = pet.charAt(0).toUpperCase() + pet.slice(1);
  var street = req.body.street;
  street = street.charAt(0).toUpperCase() + street.slice(1);
  res.send(`<h1>Your band name is:</h1> <h2>${pet}${street}</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
