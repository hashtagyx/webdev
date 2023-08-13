import express from "express";

const app = express();
const port = 3000;
var weekday = false;

function getDay(req, res, next) {
  const d = new Date();
  let day = d.getDay();
  if (day === 0 || day === 6) {
    weekday = false;
  } else weekday = true;
  
  next();
}

app.use(getDay);

app.get("/", (req, res) => {
  console.log(weekday);
  res.render("index.ejs", {
    weekday
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
