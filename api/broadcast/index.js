module.exports = async function (context, req) {
  const data = req.body;

  context.bindings.signalRMessages = [
    {
      target: "sensorUpdate",
      arguments: [data]
    }
  ];

  context.res = {
    status: 200,
    body: { result: "broadcast success" }
  };
};
