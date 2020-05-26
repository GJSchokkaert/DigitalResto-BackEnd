export default (collection, req, res) => {
  const source = req.params.source;
  collection
    .find({ source: source })
    .toArray()
    .then((results) => {
      res.json(results);
    })
    .catch((error) => console.error(error));
};
