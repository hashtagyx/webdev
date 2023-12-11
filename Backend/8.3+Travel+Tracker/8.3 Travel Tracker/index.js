import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "password",
  port: 5432,
});

const app = express();
const port = 3000;
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  let countries = [];
  let total = 0;
  const result = await db.query("SELECT country_code FROM visited_countries");
  countries = result.rows.map((row) => row.country_code);
  total = countries.length;
  res.render("index.ejs", {
    countries: countries,
    total: total
  })
  // db.end();
});

app.post("/add", async (req, res) => {
  const country = req.body.country;
  const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'", [country.toLowerCase()]);
  if (result.rowCount === 0) {
    res.redirect("/");
    return;
  }
  const countryCode = result.rows[0]['country_code'];
  
  await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);
  res.redirect("/");
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
