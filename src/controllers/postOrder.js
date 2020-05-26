export default (collection, barSockets, kitchenSockets, req, res) => {
  collection
    .insertMany(req.body)
    .then((result) => {
      const orders = req.body;
      res.json(orders);
      const barOrders = orders.filter((d) => d.source === "bar");
      const kitchenOrders = orders.filter((d) => d.source === "kitchen");
      if (barOrders && barOrders.length) barSockets.emit("order", barOrders);
      if (kitchenOrders && kitchenOrders.length)
        kitchenSockets.emit("order", kitchenOrders);
    })
    .catch((error) => console.error(error));
};
