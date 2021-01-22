import { EventEmitter } from "events";
import { Client, Events } from "tmi.js";
import TypedEmitter from "typed-emitter";

export class TwitchPollChatbot {
  events: TypedEmitter<TwitchPollChatbotEvents> = new EventEmitter();
  private votesPerUser: Record<string, number> = {};
  private answers: string[] = [];
  private hasConnectedPromise?: Promise<void>;

  get votesPerAnswerIndex() {
    const sums = Object.values(this.votesPerUser).reduce(
      (sums, index) => ({ ...sums, [index]: (sums[index] || 0) + 1 }),
      {} as Record<number, number>
    );
    return this.answers.map((a, index) => sums[index] || 0);
  }

  private get orderedVotes() {
    return this.votesPerAnswerIndex
      .map((count, index) => ({
        count,
        index,
      }))
      .filter(({ count }) => count > 0)
      .sort((a, b) => b.count - a.count);
  }

  get winningVotes() {
    const topVote = this.orderedVotes[0];
    const winning = topVote ? [topVote] : [];
    for (const vote of this.orderedVotes.slice(1)) {
      if (vote.count === topVote.count) {
        winning.push(vote);
      } else {
        break;
      }
    }
    return winning;
  }

  private get needsTieBreaker() {
    return this.winningVotes.length !== 1;
  }

  constructor(
    private client: Client,
    private options: TwitchPollChatboxOptions
  ) {
    this.attach();
  }

  attach() {
    this.detach();
    this.hasConnectedPromise = new Promise<void>((resolve) => {
      this.onConnected = () =>
        wait(this.options.channelJoinDelay ?? 2000).then(resolve);
      this.client.once("connected", this.onConnected);
    });
    this.client.on("message", this.onMessage);
  }

  detach() {
    this.client.removeListener("message", this.onMessage);
    this.client.removeListener("connected", this.onConnected);
    this.hasConnectedPromise = undefined;
  }

  async poll(question: string, answers: string[]) {
    if (!answers.length) {
      throw new Error("Can't start a poll without answers");
    }
    if (!this.hasConnectedPromise) {
      throw new Error("Can't start a poll while detached");
    }
    await this.hasConnectedPromise;

    // Announce new question
    this.answers = answers;
    this.votesPerUser = {};
    await this.announce(`${question}\n${describeAnswers(answers)}`);
  }

  async determineWinner() {
    // Determine top vote or pick randomly
    const useTieBreaker = this.needsTieBreaker;
    const selectedIndex = useTieBreaker
      ? this.options.tieBreaker(this)
      : this.winningVotes[0].index;

    // Announce result
    if (this.options.announceResult) {
      const selectedAnswer = this.answers[selectedIndex];
      await this.announce(
        this.options.announceResult(selectedAnswer, useTieBreaker)
      );
    }

    // Reset votes when a winner has been determined
    this.votesPerUser = {};

    return selectedIndex;
  }

  private vote(answerIndex: number, username: string) {
    if (answerIndex >= 0 && answerIndex < this.votesPerAnswerIndex.length) {
      this.votesPerUser[username] = answerIndex;
      this.events.emit("vote", answerIndex);
    }
  }

  private announce(message: string) {
    if (this.options.silent) {
      return Promise.resolve();
    }
    return Promise.all(
      this.client
        .getChannels()
        .map((channel) => this.client.say(channel, message))
    );
  }

  private onMessage: Events["message"] = (
    channel,
    userState,
    message,
    self
  ) => {
    // Ignore echoed messages.
    if (self) {
      return;
    }
    const voteIndex = this.options.parseVote(message);
    if (userState.username && voteIndex !== undefined) {
      this.vote(voteIndex, userState.username);
    }
  };

  // Should be noop by default. Is redefined by attach().
  private onConnected = () => {};
}

export type TwitchPollChatboxOptions = {
  parseVote: (message: string) => number | undefined;
  tieBreaker: (bot: TwitchPollChatbot) => number;
  announceResult?: (selectedAnswer: string, usedTieBreaker: boolean) => string;
  silent?: boolean;
  /**
   * Arbitrary wait time after connecting to give time to join channels
   */
  channelJoinDelay?: number;
};

export type TwitchPollChatbotEvents = {
  vote: (answerIndex: number) => void;
};

const describeAnswers = (answers: string[]) =>
  answers.map((a, i) => `${i + 1}. ${a}`).join(", ");

const wait = (timeout: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, timeout));
