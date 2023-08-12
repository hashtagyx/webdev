// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;
// !!!
const API_URL = "https://api.blockchain.com/v3/exchange/tickers/";
// BTC-USD or ETH-USD

// Create a .env file in the same directory as index.js and add the line API_KEY=[YOUR_API_KEY_HERE]
// Create a .gitignore file in the same directory as index.js if you are using git for version control, and add the line .env
const API_KEY = process.env.API_KEY;
const config = {
  headers: {
    "X-Auth-Token": API_KEY,
  }
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// !!!
app.post("/", async (req, res) => {
    try {
        let response;
        switch (req.body.coin) {
          case "BTC":
            response = await axios.get(API_URL + "BTC-USD", config);
            break;
          case "ETH":
            response = await axios.get(API_URL + "ETH-USD", config);
            break;
          default:
            throw "Coin not in switch case";
        }
        const result = response.data;
        console.log(result.last_trade_price)
        const price = result.last_trade_price;
        const count = (price * 500).toLocaleString();
        const coin = req.body.coin;
        console.log(price, typeof(price));
        const data = {
          count: count,
          coin: coin,
          price: price,
        }
        res.render("index.ejs", {data: data});
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
      }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});