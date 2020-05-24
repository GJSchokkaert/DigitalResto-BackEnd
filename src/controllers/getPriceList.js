import gsjson from "google-spreadsheet-to-json";

export default (req, res) => {
  gsjson({
    spreadsheetId: "1HEWL2JNchyS2pJY_Rve6dAyfnagGA3i8k6dEOBj2rf0",
  })
    .then((results) => {
      res.json(results);
    })
    .catch((error) => console.error(error));
};
