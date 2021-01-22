import { Client } from "tmi.js";

export const createTMIClient = () =>
  new Client({
    connection: {
      secure: true,
      reconnect: true,
    },
    identity: {
      username: process.env.REACT_APP_TTA_BOT_USERNAME!,
      password: process.env.REACT_APP_TTA_BOT_TOKEN!,
    },
    channels: [process.env.REACT_APP_TTA_BOT_CHANNEL!],
  });
