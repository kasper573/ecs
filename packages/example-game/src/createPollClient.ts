import { TwitchPollChatbot } from "./TwitchPollChatbot";

export const createPollClient = () =>
  new TwitchPollChatbot({
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
    parseVote: (message) => {
      const match = /^(\d+)$/.exec(message);
      if (match) {
        return parseInt(match[1], 10) - 1;
      }
    },
  });

const randomInteger = (max: number) => Math.floor(Math.random() * (max + 1));
