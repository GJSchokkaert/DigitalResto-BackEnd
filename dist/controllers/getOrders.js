"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (collection, req, res) {
  collection.find().toArray().then(function (results) {
    res.json(results);
  }).catch(function (error) {
    return console.error(error);
  });
};