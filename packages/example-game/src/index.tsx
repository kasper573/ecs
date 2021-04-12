import ReactDOM from "react-dom";
import React from "react";
import { Game } from "./Game";
import { createGame } from "./createGame";
import { createTMIClient } from "./createTMIClient";
import { createPollClient } from "./createPollClient";
import { Countdown } from "./Countdown";
import { ActionPoller } from "./ActionPoller";
import { pollChatbotWithCountdown } from "./pollWithCountdown";

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
