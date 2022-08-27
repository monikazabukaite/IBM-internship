if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const finnhub = require("finnhub");
const request = require("supertest");

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

  const frequency = "D";

  finnhubClient.stockCandles(
    req.query.symbol,
    frequency,
    Number.parseInt(req.query.from),
    Number.parseInt(req.query.to),
    (error, data, response) => {
      console.log(data);
      res.send(data);
    }
  );
});

const UserActionSchema = new mongoose.Schema({
  symbol: { type: String },
  userIp: { type: String },
  startDate: { type: Date },
  endDate: { type: Date, default: Date.now },
});
const UserAction = mongoose.model(
  "userAction",
  UserActionSchema,
  "userActions"
);

app.post("/log-action", async (req, res, next) => {
  console.log(req.body);
  UserAction.create(
    {
      symbol: req.body.searchPhrase,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    },
    function (err, small) {
      if (err) return console.log(err);
    }
  );

  console.log(req.body);
  res.send(req.body);
});

app.get("/log-action", (req, res) => {
  const page = req.query.page || 1;
  const limit = (req.query.limit > 100 ? 100 : req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  UserAction.find(function (error, result) {
    const trimmedResults = result.slice(startIndex, endIndex);
    res.send(trimmedResults);
  });
});

//Unit tests
request(app)
  .get("/company-profile?symbol=AAPL")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
