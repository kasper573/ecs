import { TwitchPollChatbot } from "./TwitchPollChatbot";
import { createTestClient, TestClient } from "./createTestClient";

testBotScenarios(
  "can define how to parse votes",
  () => {
    const answers = ["foo", "bar"];
    const bot = new TwitchPollChatbot({
      tieBreaker: () => -1,
      parseVote: (message) => answers.indexOf(message),
    });
    bot.poll("?", answers);
    return bot;
  },
  {
    "non-matching message is not interpreted as vote": (bot, client) => {
      client.events.emit("message", "", { username: "jestA" }, "bogus", false);
      expect(bot.winningVotes.length).toBe(0);
    },
    "matching message is interpreted as vote": (bot, client) => {
      client.events.emit("message", "", { username: "jestA" }, "foo", false);
      expect(bot.winningVotes).toEqual([{ index: 0, count: 1 }]);
    },
  }
);

test("no vote will be cast when parseVote() returns NaN", () =>
  useBot(
    new TwitchPollChatbot({
      tieBreaker: () => -1,
      parseVote: () => NaN,
    }),
    createTestClient(),
    (bot, client) => {
      client.events.emit("message", "", { username: "jestA" }, "bogus", false);
      expect(bot.winningVotes.length).toBe(0);
    }
  ));

test("no vote will be cast when parseVote() returns undefined", () =>
  useBot(
    new TwitchPollChatbot({
      tieBreaker: () => -1,
      parseVote: () => undefined,
    }),
    createTestClient(),
    (bot, client) => {
      client.events.emit("message", "", { username: "jestA" }, "bogus", false);
      expect(bot.winningVotes.length).toBe(0);
    }
  ));

test("throws error when trying to start a poll without answers", () =>
  useBot(
    new TwitchPollChatbot({
      tieBreaker: () => -1,
      parseVote: parseIndex,
    }),
    createTestClient(),
    (bot) => expect(() => bot.poll("que?", [])).toThrow()
  ));

testBotScenarios(
  "determineWinner() resets poll after returning the winner",
  (client) => {
    const bot = new TwitchPollChatbot({
      tieBreaker: () => -1,
      parseVote: parseIndex,
    });
    bot.attach(client);

    bot.poll("que?", ["a", "b"]);
    client.events.emit("message", "", { username: "jestA" }, "1", false);
    client.events.emit("message", "", { username: "jestB" }, "2", false);
    bot.determineWinner();
    return bot;
  },
  {
    votes: (bot) => expect(bot.votesPerAnswerIndex).toEqual([0, 0]),
    winningVotes: (bot) => expect(bot.winningVotes).toEqual([]),
  }
);

describe("has expected state", () => {
  testBotScenarios(
    "when no username is set",
    (client) => {
      const bot = new TwitchPollChatbot({
        tieBreaker: () => -1,
        parseVote: parseIndex,
      });
      bot.attach(client);

      const events: number[] = [];
      bot.events.on("vote", (index) => events.push(index));
      bot.poll("que?", ["first", "second"]);
      client.events.emit("message", "", {}, "1", false);
      return [bot, events];
    },
    {
      events: (bot, client, events) => expect(events).toEqual([]),
      votes: (bot) => expect(bot.votesPerAnswerIndex).toEqual([0, 0]),
      winningVotes: (bot) => expect(bot.winningVotes).toEqual([]),
      determineWinner: (bot) => expect(bot.determineWinner()).toBe(-1),
    }
  );

  testBotScenarios(
    "when there is no tie breaker",
    (client) => {
      const bot = new TwitchPollChatbot({
        tieBreaker: () => -1,
        parseVote: parseIndex,
      });
      bot.attach(client);

      const events: number[] = [];
      bot.events.on("vote", (index) => events.push(index));
      bot.poll("que?", ["first", "second"]);

      client.events.emit("message", "", { username: "jestA" }, "2", false);
      client.events.emit("message", "", { username: "jestB" }, "2", false);
      client.events.emit("message", "", { username: "jestC" }, "2", false);
      client.events.emit("message", "", { username: "jestD" }, "1", false);
      return [bot, events];
    },
    {
      events: (bot, client, events) => expect(events).toEqual([1, 1, 1, 0]),
      votes: (bot) => expect(bot.votesPerAnswerIndex).toEqual([1, 3]),
      winningVotes: (bot) =>
        expect(bot.winningVotes).toEqual([{ index: 1, count: 3 }]),
      determineWinner: (bot) => expect(bot.determineWinner()).toBe(1),
    }
  );

  testBotScenarios(
    "when votes are cast outside the accepted range",
    (client) => {
      const bot = new TwitchPollChatbot({
        tieBreaker: () => -1,
        parseVote: parseIndex,
      });
      bot.attach(client);

      const events: number[] = [];
      bot.events.on("vote", (index) => events.push(index));
      bot.poll("que?", ["first", "second"]);

      client.events.emit("message", "", { username: "jestA" }, "-1", false); // Outside
      client.events.emit("message", "", { username: "jestB" }, "-1", false); // Outside
      client.events.emit("message", "", { username: "jestC" }, "2", false);
      client.events.emit("message", "", { username: "jestD" }, "3", false); // Outside
      client.events.emit("message", "", { username: "jestE" }, "3", false); // Outside
      return [bot, events];
    },
    {
      events: (bot, client, events) => expect(events).toEqual([1]),
      votes: (bot) => expect(bot.votesPerAnswerIndex).toEqual([0, 1]),
      winningVotes: (bot) =>
        expect(bot.winningVotes).toEqual([{ index: 1, count: 1 }]),
      determineWinner: (bot) => expect(bot.determineWinner()).toBe(1),
    }
  );

  testBotScenarios(
    "when there is a false tie breaker",
    (client) => {
      const bot = new TwitchPollChatbot({
        tieBreaker: () => -1,
        parseVote: parseIndex,
      });
      bot.attach(client);

      const events: number[] = [];
      bot.events.on("vote", (index) => events.push(index));
      bot.poll("que?", ["first", "second", "third"]);

      client.events.emit("message", "", { username: "jestA" }, "1", false);
      client.events.emit("message", "", { username: "jestB" }, "2", false);
      client.events.emit("message", "", { username: "jestC" }, "2", false);
      client.events.emit("message", "", { username: "jestD" }, "3", false);
      return [bot, events];
    },
    {
      events: (bot, client, events) => expect(events).toEqual([0, 1, 1, 2]),
      votes: (bot) => expect(bot.votesPerAnswerIndex).toEqual([1, 2, 1]),
      winningVotes: (bot) =>
        expect(bot.winningVotes).toEqual([{ index: 1, count: 2 }]),
      determineWinner: (bot) => expect(bot.determineWinner()).toBe(1),
    }
  );

  testBotScenarios(
    "when there is a tie breaker",
    (client) => {
      const bot = new TwitchPollChatbot({
        tieBreaker: () => -1,
        parseVote: parseIndex,
      });
      bot.attach(client);

      const events: number[] = [];
      bot.events.on("vote", (index) => {
        events.push(index);
      });
      bot.poll("que?", ["first", "second"]);

      client.events.emit("message", "", { username: "jestA" }, "2", false);
      client.events.emit("message", "", { username: "jestB" }, "2", false);
      client.events.emit("message", "", { username: "jestC" }, "1", false);
      client.events.emit("message", "", { username: "jestD" }, "1", false);
      return [bot, events];
    },
    {
      events: (bot, client, events) => {
        expect(events).toEqual([1, 1, 0, 0]);
      },
      votes: (bot) => expect(bot.votesPerAnswerIndex).toEqual([2, 2]),
      winningVotes: (bot) =>
        expect(bot.winningVotes).toEqual([
          { index: 0, count: 2 },
          { index: 1, count: 2 },
        ]),
      determineWinner: (bot) => expect(bot.determineWinner()).toBe(-1),
    }
  );

  testBotScenarios(
    "when there are no votes (should count as tie breaker)",
    () => {
      const bot = new TwitchPollChatbot({
        tieBreaker: () => -1,
        parseVote: parseIndex,
      });
      const events: number[] = [];
      bot.events.on("vote", (index) => events.push(index));
      bot.poll("que?", ["first", "second"]);
      return [bot, events];
    },
    {
      events: (bot, client, events) => expect(events).toEqual([]),
      votes: (bot) => expect(bot.votesPerAnswerIndex).toEqual([0, 0]),
      winningVotes: (bot) => expect(bot.winningVotes).toEqual([]),
      determineWinner: (bot) => expect(bot.determineWinner()).toBe(-1),
    }
  );
});

function testBotScenarios<P>(
  groupDescription: string,
  createBot: (client: TestClient) => TwitchPollChatbot | [TwitchPollChatbot, P],
  testScenarios: Record<
    string,
    (bot: TwitchPollChatbot, client: TestClient, param?: P) => void
  >
) {
  // eslint-disable-next-line jest/valid-title
  describe(groupDescription, () => {
    Object.keys(testScenarios).forEach((scenarioDescription) => {
      // eslint-disable-next-line jest/valid-title
      test(scenarioDescription, () => {
        const client = createTestClient();
        const scenario = testScenarios[scenarioDescription];
        const ret = createBot(client);
        const [bot, param] = Array.isArray(ret) ? ret : [ret, undefined];
        useBot(bot, client, (b, c) => scenario(b, c, param));
      });
    });
  });
}

const useBot = (
  bot: TwitchPollChatbot,
  client: TestClient,
  use: (bot: TwitchPollChatbot, client: TestClient) => void
) => {
  bot.attach(client);
  client.connect();
  use(bot, client);
  client.disconnect();
  bot.detach(client);
  bot.events.removeAllListeners();
};

const parseIndex = (str: string) => parseInt(str, 10) - 1;
