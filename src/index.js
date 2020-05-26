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
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// init server and io(s)
const server = http.Server(app);
const io = socketIo(server, { origins: "*:*" });
const ioBar = io.of("/bar");
const ioKitchen = io.of("/kitchen");

io.on("connection", (socket) => {
  console.info(`Client connected to global namespace [id=${socket.id}]`);
});

ioBar.on("connection", (socket) => {
  console.info(`Client connected to bar namespace [id=${socket.id}]`);
});

ioKitchen.on("connection", (socket) => {
  console.info(`Client connected to kitchen namespace [id=${socket.id}]`);
});

// connect to mongodb + register api calls
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then((client) => {
    console.info("connected to mongo");
    const db = client.db("digitalresto");
    const ordersCollection = db.collection("orders");

    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    app.post("/order", (req, res) => {
      postOrder(ordersCollection, ioBar, ioKitchen, req, res);
    });

    app.get("/orders/:source", (req, res) => {
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
  console.info("listening on " + port);
});
