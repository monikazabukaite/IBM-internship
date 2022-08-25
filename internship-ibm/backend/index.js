if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");

const app = express();
const port = 3001;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const axios = require("axios");
const finnhub = require("finnhub");

const mongoose = require("mongoose");
const dbConnString = process.env.DATABASE_CONNECTION_STRING;
mongoose.connect(dbConnString);
var db = mongoose.connection;

const cors = require("cors");

app.use(cors(), function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/health-check", (req, res) => {
  res.send("Alive!");
});

app.get("/company-profile", (req, res) => {
  const api_key = finnhub.ApiClient.instance.authentications["api_key"];
  api_key.apiKey = process.env.FINNHUB_API_KEY;
  const finnhubClient = new finnhub.DefaultApi();

  finnhubClient.companyProfile2(
    { symbol: req.query.symbol },
    (error, data, response) => {
      console.log(data);

      if (error) {
        return res.status(400).json(error);
      }

      res.send(data);
    }
  );
});

app.get("/stock-details", (req, res) => {
  const api_key = finnhub.ApiClient.instance.authentications["api_key"];
  api_key.apiKey = process.env.FINNHUB_API_KEY;
  const finnhubClient = new finnhub.DefaultApi();

  console.log(req.query);
  // finnhubClient.stockCandles(
  //   "AAPL",
  //   "D",
  //   1590988249,
  //   1591852249,
  //   (error, data, response) => {
  //     console.log(data);
  //   }
  // );

  finnhubClient.stockCandles(
    req.query.symbol,
    "D",
    Number.parseInt(req.query.from),
    ßNumber.parseInt(req.query.to),
    (error, data, response) => {
      console.log(data);
      res.send(data);
    }
  );
});

const UserActionSchema = new mongoose.Schema({
  symbol: { type: String },
  userIp: { type: String },
  dateFrom: { type: Date },
  dateTo: { type: Date, default: Date.now },
});
const UserAction = mongoose.model(
  "userAction",
  UserActionSchema,
  "userActions"
);

app.post("/log-action", async (req, res, next) => {
  UserAction.create(
    {
      symbol: req.body.symbol,
      userIp: req.body.userIp,
      dateFrom: req.body.dateFrom,
      dateTo: req.body.dateTo,
    },
    function (err, small) {
      if (err) return console.log(err);
    }
  );

  console.log(req.body);
  res.send(req.body);
});

app.get("/log-action", (req, res) => {
  UserAction.find(function (error, result) {
    console.log(result);
    res.send(result);
  });
});

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
