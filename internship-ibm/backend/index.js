if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = 3001;

const axios = require("axios");
const finnhub = require("finnhub");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/company-profile", (req, res) => {
  const api_key = finnhub.ApiClient.instance.authentications["api_key"];
  api_key.apiKey = process.env.FINNHUB_API_KEY;
  const finnhubClient = new finnhub.DefaultApi();

  finnhubClient.companyProfile2({ symbol: "AAPL" }, (error, data, response) => {
    console.log(data);
    res.send(data);
  });
});

app.get("/stock-details", (req, res) => {
  const api_key = finnhub.ApiClient.instance.authentications["api_key"];
  api_key.apiKey = "cc0dba2ad3ifk6ta9sfg";
  const finnhubClient = new finnhub.DefaultApi();

  finnhubClient.stockCandles(
    "AAPL",
    "D",
    1590988249,
    1591852249,
    (error, data, response) => {
      console.log(data);
      res.send(data);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
