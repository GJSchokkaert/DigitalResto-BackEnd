"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (collection, req, res) {
  collection.insertOne(req.body).then(function (result) {
    res.json(req.body);
  }).catch(function (error) {
    return console.error(error);
  });
};