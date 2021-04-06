import { CancelablePromise } from "cancelable-promise";
import { System } from "../ecs/System";
import { createActions } from "../ecs-interactive/createActions";
import { InteractionResult } from "../ecs-interactive/InteractionResult";

export class ActionPoller {
  result?: InteractionResult;
  private system?: System;
  private pending = false;
  private pollPromise?: CancelablePromise<MixedPollResult>;
  private resultPromise?: Promise<void>;
  private isPolling = false;

  get end() {
    return this.resultPromise ?? Promise.resolve();
  }

  get done() {
    return (async () => {
      while (this.pending) {
        await wait(0);
        await this.end;
      }
    })();
  }

  constructor(private question: string, private poll: Poll) {}

  attach(system: System) {
    this.detach();
    this.system = system;
    this.system.events.on("update", this.pollForAction);
    this.pollForAction();
  }

  detach() {
    if (this.system) {
      this.system.events.off("update", this.pollForAction);
      this.system = undefined;
    }
  }

  pollForAction = () => {
    if (!this.system) {
      throw new Error("Can't poll without system");
    }
    if (this.isPolling) {
      return;
    }
    if (this.pollPromise) {
      this.pollPromise.cancel();
      this.pollPromise = undefined;
      this.resultPromise = undefined;
      this.pending = false;
    }
    const actions = createActions(this.system);
    if (!actions.length) {
      return;
    }
    const actionNames = actions.map((action) => action.name);
    this.pending = true;
    this.pollPromise = this.poll(this.question, actionNames);
    this.resultPromise = this.pollPromise.then(this.onPollResult);
  };

  private onPollResult = (mixedResult: MixedPollResult) => {
    if (!this.system) {
      throw new Error("Can't handle poll result without system");
    }
    this.pending = false;
    const { answerIndex, preventRecursion } = normalizeResult(mixedResult);
    const actions = createActions(this.system);
    const action = actions[answerIndex];
    if (action) {
      if (preventRecursion) {
        this.isPolling = true;
      }
      this.result = action.perform();
      this.isPolling = false;
    }
  };
}

const wait = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const normalizeResult = (mixed: MixedPollResult): PollResult =>
  typeof mixed === "number"
    ? { answerIndex: mixed, preventRecursion: false }
    : mixed;

export type Poll = (
  question: string,
  answers: string[]
) => CancelablePromise<AnswerIndex> | CancelablePromise<PollResult>;

type AnswerIndex = number;
type PollResult = { answerIndex: AnswerIndex; preventRecursion: boolean };
type MixedPollResult = AnswerIndex | PollResult;
