import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "password",
  port: 5432,
});
db.connect();

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];

let itemsRes = await db.query("SELECT * FROM items");
let items = itemsRes.rows;


app.get("/", (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  console.log(req.body);

  const result = await db.query(
    "INSERT INTO items (title) VALUES ($1) RETURNING *",
    [item]
  );
  items.push(result.rows[0]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  console.log(req.body)
  const updatedItemId = Number(req.body.updatedItemId);
  const updatedItemTitle = req.body.updatedItemTitle;
  const result = await db.query(
    "UPDATE items SET title=($1) WHERE id=($2) RETURNING *",
    [updatedItemTitle, updatedItemId]
  );
  // console.log(result);
  // console.log(result.rows);
  const idx = items.findIndex(item => item.id === updatedItemId);
  items[idx] = result.rows[0];
  // console.log(idx);

  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  console.log(req.body);
  const deleteItemId = req.body.deleteItemId;

  await db.query(
    "DELETE FROM items WHERE id=($1)",
    [deleteItemId]
  );
  const idx = items.findIndex(item => item.id === deleteItemId);
  items.splice(idx, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
