import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import postOrder from "./controllers/postOrder";
import getOrders from "./controllers/getOrders";
import getPriceList from "./controllers/getPriceList";

// get env variables
dotenv.config();
const port = process.env.PORT || 3000;
const connectionString = process.env.CONNECTION_STRING_MONGODB;

// init express
const app = express();
app.use(bodyParser.json());

// connect to mongodb + register api calls
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db("digitalresto");
    const ordersCollection = db.collection("orders");

    app.post("/order", (req, res) => {
      postOrder(ordersCollection, req, res);
    });
    app.get("/orders", (req, res) => {
      getOrders(ordersCollection, req, res);
    });
    app.get("/priceList", (req, res) => {
      getPriceList(req, res);
    });
  })
  .catch((error) => {
    console.log(
      "not be able to connect to db with connectionstring " + connectionString
    );
    console.error(error);
  });

app.listen(port, function () {
  console.log("listening on " + port);
});
