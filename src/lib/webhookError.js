const uploadToPastebin = require("./uploadToPastebin");
const fetch = require("node-fetch");

module.exports = async function uploadError(embed, errorMessage) {
  if (!process.env.ERROR_WEBHOOK) {
    return;
  }

  let error = errorMessage;
  if (errorMessage.length > 2000) {
    error = `The error was too long to send in a message, so here is a pastebin link: ${await uploadToPastebin(
      errorMessage
    )}`;
  }

  embed.description = error;

  const body = {
    content: null,
    embeds: [embed],
    username: "Clarity Error",
    avatar_url: "https://github.com/DwifteJB.png",
    attachments: [],
  };

  fetch(process.env.ERROR_WEBHOOK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
