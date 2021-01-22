import {
  TwitchPollChatbot,
  TwitchPollChatboxOptions,
} from "./TwitchPollChatbot";
import { createTestClient, TestClient } from "./createTestClient";

test("can define how to parse votes", () => {
  const answers = ["first", "second"];
  return useBot(
    {
      ...createBasicOptions(),
      parseVote: (message) => answers.indexOf(message),
    },
    async (bot, client) => {
      await bot.poll("que?", answers);
      client.events.emit("message", "", { username: "jestA" }, "bogus", false);
      expect(bot.winningVotes.length).toBe(0);
      client.events.emit("message", "", { username: "jestA" }, "first", false);
      expect(bot.winningVotes.length).toBe(1);
    }
  );
});

test("determineWinner() resets poll after returning the winner", () =>
  useBot(createBasicOptions(), async (bot, client) => {
    await bot.poll("que?", ["a", "b"]);
    client.events.emit("message", "", { username: "jestA" }, "1", false);
    client.events.emit("message", "", { username: "jestB" }, "2", false);
    await bot.determineWinner();
    expect(bot.votesPerAnswerIndex).toEqual([0, 0]);
    expect(bot.winningVotes).toEqual([]);
  }));

describe("determines the right winner", () => {
  test("when there is no tie breaker", () =>
    useBot(createBasicOptions(), async (bot, client) => {
      await bot.poll("que?", ["first", "second"]);
      client.events.emit("message", "", { username: "jestA" }, "2", false);
      client.events.emit("message", "", { username: "jestB" }, "2", false);
      client.events.emit("message", "", { username: "jestC" }, "2", false);
      client.events.emit("message", "", { username: "jestD" }, "1", false);
      expect(bot.votesPerAnswerIndex).toEqual([1, 3]);
      expect(bot.winningVotes).toEqual([{ index: 1, count: 3 }]);
      expect(await bot.determineWinner()).toBe(1);
    }));

  test("when votes are cast outside the accepted range", () =>
    useBot(createBasicOptions(), async (bot, client) => {
      await bot.poll("que?", ["first", "second"]);
      client.events.emit("message", "", { username: "jestA" }, "-1", false); // Outside
      client.events.emit("message", "", { username: "jestB" }, "-1", false); // Outside
      client.events.emit("message", "", { username: "jestC" }, "2", false);
      client.events.emit("message", "", { username: "jestD" }, "3", false); // Outside
      client.events.emit("message", "", { username: "jestE" }, "3", false); // Outside
      expect(bot.votesPerAnswerIndex).toEqual([0, 1]);
      expect(bot.winningVotes).toEqual([{ index: 1, count: 1 }]);
      expect(await bot.determineWinner()).toBe(1);
    }));

  test("when there is a false tie breaker", () =>
    // rephrase
    useBot(createBasicOptions(), async (bot, client) => {
      await bot.poll("que?", ["first", "second", "third"]);
      client.events.emit("message", "", { username: "jestA" }, "1", false);
      client.events.emit("message", "", { username: "jestB" }, "2", false);
      client.events.emit("message", "", { username: "jestC" }, "2", false);
      client.events.emit("message", "", { username: "jestD" }, "3", false);
      expect(bot.votesPerAnswerIndex).toEqual([1, 2, 1]);
      expect(bot.winningVotes).toEqual([{ index: 1, count: 2 }]);
      expect(await bot.determineWinner()).toBe(1);
    }));

  test("when there is a tie breaker", () =>
    useBot(createBasicOptions(), async (bot, client) => {
      await bot.poll("que?", ["first", "second"]);
      client.events.emit("message", "", { username: "jestA" }, "2", false);
      client.events.emit("message", "", { username: "jestB" }, "2", false);
      client.events.emit("message", "", { username: "jestC" }, "1", false);
      client.events.emit("message", "", { username: "jestD" }, "1", false);
      expect(bot.votesPerAnswerIndex).toEqual([2, 2]);
      expect(bot.winningVotes).toEqual([
        { index: 0, count: 2 },
        { index: 1, count: 2 },
      ]);
      expect(await bot.determineWinner()).toBe(-1);
    }));

  test("when there are no votes (should count as tie breaker)", () =>
    useBot(createBasicOptions(), async (bot) => {
      await bot.poll("que?", ["first", "second"]);
      expect(bot.votesPerAnswerIndex).toEqual([0, 0]);
      expect(bot.winningVotes).toEqual([]);
      expect(await bot.determineWinner()).toBe(-1);
    }));
});

const useBot = async (
  options: TwitchPollChatboxOptions,
  use: (bot: TwitchPollChatbot, client: TestClient) => Promise<void>
) => {
  const client = createTestClient();
  const bot = new TwitchPollChatbot(client, options);
  await client.connect();
  await use(bot, client);
  await client.disconnect();
  bot.detach();
};

const createBasicOptions = () => ({
  silent: true,
  tieBreaker: () => -1,
  channelJoinDelay: 0, // No wait time since there are no real channels to join (speeds up tests)
  announceResult: (selectedAnswer: string, wasRandom: boolean) =>
    wasRandom
      ? `No votes, randomly chose "${selectedAnswer}"`
      : `Will ${selectedAnswer.toLowerCase()}`,
  parseVote: (message: string) => {
    const match = /^-?\d+$/.exec(message);
    if (match) {
      return parseInt(match[0], 10) - 1;
    }
  },
});
