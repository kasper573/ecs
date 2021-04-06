import ReactDOM from "react-dom";
import React from "react";
import { Game } from "../packages/example-game/Game";
import reportWebVitals from "../reportWebVitals";
import { createGame } from "../packages/example-game/createGame";
import { createTMIClient } from "../packages/example-game/createTMIClient";
import { createPollClient } from "../packages/example-game/createPollClient";
import { Countdown } from "../packages/example-game/Countdown";
import { ActionPoller } from "../packages/example-game/ActionPoller";
import { pollChatbotWithCountdown } from "../packages/example-game/pollWithCountdown";

const system = createGame();
const tmiClient = createTMIClient();
const pollClient = createPollClient();
pollClient.events.on("vote", render);
pollClient.attach(tmiClient);
tmiClient.connect();

const countdown = new Countdown();
countdown.onInterval(1000, render);

const actionPoller = new ActionPoller("What now?", (question, answers) =>
  pollChatbotWithCountdown(pollClient, countdown, question, answers, 30 * 1000)
);
actionPoller.attach(system);

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
