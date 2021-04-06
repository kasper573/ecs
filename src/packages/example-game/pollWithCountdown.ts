import { CancelablePromise } from "cancelable-promise";
import { TwitchPollChatbot } from "./TwitchPollChatbot";
import { Countdown } from "./Countdown";

export const pollChatbotWithCountdown = (
  client: TwitchPollChatbot,
  countdown: Countdown,
  question: string,
  answers: string[],
  waitTime: number
) => {
  const promise = new CancelablePromise<number>(async (resolve) => {
    await client.poll(question, answers);
    await countdown.start(waitTime);
    if (!promise.isCanceled()) {
      resolve(client.determineWinner());
    }
  });
  return promise;
};
