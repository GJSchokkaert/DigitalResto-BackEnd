export default (collection, connectedSockets, req, res) => {
  collection
    .insertOne(req.body)
    .then((result) => {
      res.json(req.body);
      connectedSockets.emit("order", req.body);
    })
    .catch((error) => console.error(error));
};
