import { EventEmitter } from "events";
import { Client, Events, Options } from "tmi.js";
import TypedEmitter from "typed-emitter";

export class TwitchPollChatbot extends Client {
  events: TypedEmitter<TwitchPollChatbotEvents> = new EventEmitter();
  private votesPerUser: Record<string, number> = {};
  private answers: string[] = [];
  private hasConnectedPromise = new Promise((resolve) =>
    // HACK waiting arbitrary seconds after connecting to give time to join channels
    this.on("connected", () => wait(2000).then(resolve))
  );

  get votesPerAnswerIndex() {
    const sums = Object.values(this.votesPerUser).reduce(
      (sums, index) => ({ ...sums, [index]: (sums[index] || 0) + 1 }),
      {} as Record<number, number>
    );
    return this.answers.map((a, index) => sums[index] || 0);
  }

  get orderedVotes() {
    return this.votesPerAnswerIndex
      .map((count, index) => ({
        count,
        index,
      }))
      .sort((a, b) => b.count - a.count);
  }

  get hasVotes() {
    return sum(this.votesPerAnswerIndex) > 0;
  }

  constructor(private options: TwitchPollChatboxOptions) {
    super(options);
    this.on("message", this.onMessage);
  }

  async poll(question: string, answers: string[]) {
    if (!answers.length) {
      throw new Error("Can't start a poll without answers");
    }

    await this.hasConnectedPromise;

    // Announce new question
    this.answers = answers;
    this.votesPerUser = {};
    await this.announce(`${question}\n${describeAnswers(answers)}`);
  }

  async determineWinner() {
    // Determine top vote or pick randomly
    const pickRandom = !this.hasVotes;
    const selectedIndex = pickRandom
      ? Math.floor(0.5 + Math.random() * (this.votesPerAnswerIndex.length - 1))
      : this.orderedVotes[0].index;

    // Announce result
    if (this.options.announceResult) {
      const selectedAnswer = this.answers[selectedIndex];
      await this.announce(
        this.options.announceResult(selectedAnswer, pickRandom)
      );
    }

    // Reset votes when a winner has been determined
    this.votesPerUser = {};

    return selectedIndex;
  }

  vote(answerIndex: number, username: string) {
    if (answerIndex >= 0 && answerIndex < this.votesPerAnswerIndex.length) {
      this.votesPerUser[username] = answerIndex;
      this.events.emit("vote", answerIndex);
    }
  }

  announce(message: string) {
    if (this.options.silent) {
      return Promise.resolve();
    }
    return Promise.all(
      this.getChannels().map((channel) => this.say(channel, message))
    );
  }

  onMessage: Events["message"] = (channel, userState, message, self) => {
    // Ignore echoed messages.
    if (self) {
      return;
    }
    const voteIndex = this.options.parseVote(message);
    if (userState.username && voteIndex !== undefined) {
      this.vote(voteIndex, userState.username);
    }
  };
}

export type TwitchPollChatboxOptions = Options & {
  parseVote: (message: string) => number | undefined;
  announceResult?: (selectedAnswer: string, wasRandom: boolean) => string;
  silent?: boolean;
};

export type TwitchPollChatbotEvents = {
  vote: (answerIndex: number) => void;
};

const describeAnswers = (answers: string[]) =>
  answers.map((a, i) => `${i + 1}. ${a}`).join(", ");

const wait = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const sum = (a: number[]) => a.reduce((s, n) => s + n, 0);
