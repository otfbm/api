const fetch = require("node-fetch");

exports.patreon = {
  async login(path, clientId, clientSecret) {
    const code = path.split("/")[2];

    const result = await fetch("https://www.patreon.com/api/oauth2/token", {
      method: "post",
      body: `code=${code}&grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=http://localhost:8080`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const data = await result.json();
    const token = data["access_token"];

    const userResult = await fetch(
      "https://www.patreon.com/api/oauth2/api/current_user",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const user = await userResult.json();

    return {
      user: user.data.id,
      access: user.data.relationships.pledges.data.length > 0,
    };
  },
};
