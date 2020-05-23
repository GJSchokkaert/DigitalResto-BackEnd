"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _googleSpreadsheetToJson = require("google-spreadsheet-to-json");

var _googleSpreadsheetToJson2 = _interopRequireDefault(_googleSpreadsheetToJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res) {
  (0, _googleSpreadsheetToJson2.default)({
    spreadsheetId: "1HEWL2JNchyS2pJY_Rve6dAyfnagGA3i8k6dEOBj2rf0"
  }).then(function (results) {
    res.json(results);
  }).catch(function (error) {
    return console.error(error);
  });
};