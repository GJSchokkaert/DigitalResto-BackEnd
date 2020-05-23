export default (collection, req, res) => {
  collection
    .find()
    .toArray()
    .then((results) => {
      res.json(results);
    })
    .catch((error) => console.error(error));
};
