import { TwitchPollChatbot } from "../twitch-poll-chatbot/TwitchPollChatbot";

export const createPollClient = () => {
  const bot = new TwitchPollChatbot({
    silent: true,
    announceResult: (selectedAnswer, wasRandom) =>
      wasRandom
        ? `No votes, randomly chose "${selectedAnswer}"`
        : `Will ${selectedAnswer.toLowerCase()}`,
    parseVote: (message) => {
      const match = /^(\d+)$/.exec(message);
      if (match) {
        return parseInt(match[1], 10) - 1;
      }
    },
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
  bot.connect();
  return bot;
};
