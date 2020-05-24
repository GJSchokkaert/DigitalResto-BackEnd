export default (collection, req, res) => {
  collection
    .insertOne(req.body)
    .then((result) => {
      res.json(req.body);
    })
    .catch((error) => console.error(error));
};
