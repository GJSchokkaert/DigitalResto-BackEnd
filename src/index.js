import express from "express";
import cors from "cors";
import socketIo from "socket.io";
import http from "http";
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
app.use(cors());
app.use(bodyParser.json());

// init server and io
const server = http.Server(app);
const io = socketIo(server);

// connect to mongodb + register api calls
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then((client) => {
    console.log("connected to mongo");
    const db = client.db("digitalresto");
    const ordersCollection = db.collection("orders");

    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    io.on("connection", (socket) => {
      socket.emit("news", { hello: "world" });
      socket.on("my other event", (data) => {
        console.log(data);
      });
    });

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
    console.error(error);
  });

server.listen(port, function () {
  console.log("listening on " + port);
});
