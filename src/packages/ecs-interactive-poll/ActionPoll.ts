import { CancelablePromise } from "cancelable-promise";
import { SystemModule } from "../ecs/SystemModule";
import { System } from "../ecs/System";
import { createActions } from "../ecs-interactive/createActions";
import { InteractionResult } from "../ecs-interactive/InteractionResult";

export class ActionPoll implements SystemModule {
  system?: System;
  result?: InteractionResult;
  private pending = false;
  private pollPromise?: CancelablePromise<MixedPollResult>;
  private resultPromise?: Promise<void>;
  private pollOnUpdate = true;

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

  update() {
    if (this.pollOnUpdate) {
      this.pollForAction();
    }
  }

  private pollForAction() {
    if (!this.system) {
      throw new Error("Can't poll without system");
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
  }

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
        this.pollOnUpdate = false;
      }
      this.result = action.perform();
      this.pollOnUpdate = true;
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
