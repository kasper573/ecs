import React from "react";
import ReactDOM from "react-dom";
import App from "./packages/twitch-text-adventure/react/App";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./packages/twitch-text-adventure/react/theme";
import { createGame } from "./packages/twitch-text-adventure/createGame";
import { ActionPoll } from "./packages/ecs-interactive-poll/ActionPoll";
import { createPollClient } from "./packages/twitch-text-adventure/createPollClient";
import { Countdown } from "./packages/twitch-text-adventure/Countdown";
import { pollChatbotWithCountdown } from "./packages/twitch-text-adventure/pollWithCountdown";

const system = createGame();
const client = createPollClient();
const countdown = new Countdown();
countdown.onInterval(1000, render);

system.modules.push(
  new ActionPoll("What now?", (question, answers) =>
    pollChatbotWithCountdown(client, countdown, question, answers, 15 * 1000)
  ),
  { update: render }
);

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App theme={theme} system={system} timeLeft={countdown.timeLeft} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
