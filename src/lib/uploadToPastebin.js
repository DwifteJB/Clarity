const fetch = require("node-fetch");
const { URLSearchParams } = require("url");
module.exports = async function uploadToPastebin(content) {
  const encodedParams = new URLSearchParams();
  encodedParams.set("api_paste_code", content);
  encodedParams.set("api_option", "paste");
  encodedParams.set("api_dev_key", "6fc02b84909b2b5ce2316f482e9e16d2");
  encodedParams.set(`api_paste_private`, `1`);

  const data = await fetch("https://pastebin.com/api/api_post.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodedParams.toString(),
  });

  return await data.text();
};
