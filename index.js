const handlers = require("./handlers");

exports.handler = async (event, context, metrics) => {
  let body;
  try {
    // const query = (event && event.multiValueQueryStringParameters) || {};
    const path = event.rawPath || event.path;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    // mount handlers
    if (path.includes("patreon/login")) {
      body = await handlers.patreon.login(path, clientId, clientSecret);
    }
  } catch (err) {
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ error: err.message, content: err }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
};
