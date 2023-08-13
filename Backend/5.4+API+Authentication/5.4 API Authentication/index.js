import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "q";
const yourPassword = "q";
const yourAPIKey = "bd460aca-58c4-4927-9d06-b6fd093b38f5";
const yourBearerToken = "622ca2a5-2bb5-4049-9f3f-ec24e3ad9c10";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const URL = `https://secrets-api.appbrewery.com/random`
    const response = await axios.get(URL);
    const result = response.data;
    console.log(response)
    console.log(result)
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  try {
    const pageNum = 2;
    const URL = `https://secrets-api.appbrewery.com/all?page=${pageNum}`
    const response = await axios.get(URL, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      }
    });
    const result = response.data;
    console.log(response)
    console.log(result)
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    const score = 5
    const URL = `https://secrets-api.appbrewery.com/filter?score=${score}&apiKey=${yourAPIKey}`
    const response = await axios.get(URL);
    const result = response.data;
    console.log(response)
    console.log(result)
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  try {
    const secretID = 42;
    const URL = `https://secrets-api.appbrewery.com/secrets/${secretID}`
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`
      }
    });
    const result = response.data;
    console.log(response)
    console.log(result)
    res.render("index.ejs", { content: JSON.stringify(result) });
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
