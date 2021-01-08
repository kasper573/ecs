import { Client } from "tmi.js";
import { config } from "dotenv";

config();

const channel = process.env["TTA_BOT_CHANNEL"];
const client = new Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: process.env["TTA_BOT_USERNAME"],
    password: process.env["TTA_BOT_TOKEN"],
  },
  channels: channel ? [channel] : [],
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  // Ignore echoed messages.
  if (self) return;

  if (message.toLowerCase() === "!hello") {
    // "@alca, heya!"
    client.say(channel, `@${tags.username}, heya!`);
  }
});
