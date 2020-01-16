module.exports = async function(context, req) {
  const { userId, clientId, order } = req.body;

  var orderToPost = {
    id: util.ID(),
    userId: userId,
    clientId: clientId,
    order: order
  };

  return {
    httpResponse: {
      body: orderToPost
    },
    signalRMessages: [
      {
        target: "newMessage",
        arguments: [orderToPost]
      }
    ]
  };
};
