import { Client } from "tmi.js";
import { TwitchPollChatbot } from "../twitch-poll-chatbot/TwitchPollChatbot";

export const createPollClient = (client: Client) =>
  new TwitchPollChatbot(client, {
    silent: true,
    tieBreaker: (bot) => {
      // No one has voted
      if (bot.winningVotes.length === 0) {
        return randomInteger(bot.votesPerAnswerIndex.length - 1);
      }
      // Votes exist but we need a tie breaker
      const randomVoteIndex = randomInteger(bot.winningVotes.length - 1);
      const answerIndex = bot.winningVotes[randomVoteIndex].index;
      return answerIndex;
    },
    announceResult: (selectedAnswer, usedTieBreaker) =>
      usedTieBreaker
        ? `Tie breaker, randomly chose "${selectedAnswer}"`
        : `Will ${selectedAnswer.toLowerCase()}`,
    parseVote: (message) => {
      const match = /^(\d+)$/.exec(message);
      if (match) {
        return parseInt(match[1], 10) - 1;
      }
    },
  });

const randomInteger = (max: number) => Math.floor(Math.random() * (max + 1));
