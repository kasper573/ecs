import ReactDOM from "react-dom";
import React from "react";
import { Game } from "../packages/twitch-text-adventure/react/Game";
import reportWebVitals from "../reportWebVitals";
import { createGame } from "../packages/twitch-text-adventure/createGame";
import { createTMIClient } from "../packages/twitch-text-adventure/createTMIClient";
import { createPollClient } from "../packages/twitch-text-adventure/createPollClient";
import { Countdown } from "../packages/twitch-text-adventure/Countdown";
import { ActionPoller } from "../packages/ecs-interactive-poll/ActionPoller";
import { pollChatbotWithCountdown } from "../packages/twitch-text-adventure/pollWithCountdown";

const system = createGame();
const tmiClient = createTMIClient();
const pollClient = createPollClient();
pollClient.events.on("vote", render);
pollClient.attach(tmiClient);
tmiClient.connect();

const countdown = new Countdown();
countdown.onInterval(1000, render);

system.modules.push(
  new ActionPoller("What now?", (question, answers) =>
    pollChatbotWithCountdown(
      pollClient,
      countdown,
      question,
      answers,
      30 * 1000
    )
  )
);

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Game
        system={system}
        timeLeft={countdown.timeLeft}
        votesPerAction={pollClient.votesPerAnswerIndex}
      />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
