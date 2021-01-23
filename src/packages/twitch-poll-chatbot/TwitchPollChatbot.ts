import { EventEmitter } from "events";
import { Client, Events } from "tmi.js";
import TypedEmitter from "typed-emitter";

export class TwitchPollChatbot {
  events: TypedEmitter<TwitchPollChatbotEvents> = new EventEmitter();
  private votesPerUser: Record<string, number> = {};
  private answers: string[] = [];

  /**
   * Votes per answer index
   * ie. bot.votes[2] gets the number of votes for answer index 2
   */
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

  /**
   * The top vote objects.
   * - Empty if no votes cast
   * - Array of one item if there was a clear winner
   * - Array of n items if there was an n-way tie
   */
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

  constructor(private options: TwitchPollChatboxOptions) {}

  attach(client: Client) {
    client.on("message", this.onMessage);
  }

  detach(client: Client) {
    client.removeListener("message", this.onMessage);
  }

  poll(question: string, answers: string[]) {
    if (!answers.length) {
      throw new Error("Can't start a poll without answers");
    }

    // Reset votes and remember answers
    this.answers = answers;
    this.votesPerUser = {};
  }

  determineWinner() {
    // Determine top vote or pick randomly
    const useTieBreaker = this.needsTieBreaker;
    const selectedIndex = useTieBreaker
      ? this.options.tieBreaker(this)
      : this.winningVotes[0].index;

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

  private onMessage: Events["message"] = (channel, userState, message) => {
    const voteIndex = this.options.parseVote(message);
    if (userState.username && voteIndex !== undefined && !isNaN(voteIndex)) {
      this.vote(voteIndex, userState.username);
    }
  };
}

export type TwitchPollChatboxOptions = {
  parseVote: (message: string) => number | undefined;
  tieBreaker: (bot: TwitchPollChatbot) => number;
};

export type TwitchPollChatbotEvents = {
  vote: (answerIndex: number) => void;
};
