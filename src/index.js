const { Client } = require("pg");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 4000;
const redis = require("redis");
//connect to client
const redisPort = 6379;
const redisHost = "redis";
const redisClient = redis.createClient({
  url: `redis://@${redisHost}:${redisPort}`,
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("connected"));
redisClient.connect();
// connect to mongodb
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT= '27017'
// const HOST ='mongo'

// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${HOST}:${DB_PORT}`;
// mongoose.connect(URI).then(()=>console.log('connection sucsess')).catch((err)=>console.log('failed ', err ))

// connect to pg
const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_PORT = 5432;

const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@postgres:${DB_PORT}`;

const client = new Client({
  connectionString: URI,
});

client
  .connect()
  .then(() => console.log("connection sucsess"))
  .catch((err) => console.log("failed ", err));

///////////////////////////////////////////////////////
app.get("/", (req, res) => {
  redisClient.set("products", "konafa manga ");
  res.send("konafa manga ho hohoh from aws ");
});

app.get("/7alaweyat", async (req, res) => {
  const products = await redisClient.get("products");
  res.send(products);
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
