"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _postOrder = require("./controllers/postOrder");

var _postOrder2 = _interopRequireDefault(_postOrder);

var _getOrders = require("./controllers/getOrders");

var _getOrders2 = _interopRequireDefault(_getOrders);

var _getPriceList = require("./controllers/getPriceList");

var _getPriceList2 = _interopRequireDefault(_getPriceList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// get env variables
_dotenv2.default.config();
var port = process.env.PORT || 3000;
var connectionString = process.env.CONNECTION_STRING_MONGODB;

// init express
var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());

// connect to mongodb + register api calls
var MongoClient = require("mongodb").MongoClient;
MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(function (client) {
  var db = client.db("digitalresto");
  var ordersCollection = db.collection("orders");

  app.post("/order", function (req, res) {
    (0, _postOrder2.default)(ordersCollection, req, res);
  });
  app.get("/orders", function (req, res) {
    (0, _getOrders2.default)(ordersCollection, req, res);
  });
  app.get("/priceList", function (req, res) {
    (0, _getPriceList2.default)(req, res);
  });
}).catch(function (error) {
  return console.error(error);
});

app.listen(port, function () {
  console.log("listening on 3000");
});