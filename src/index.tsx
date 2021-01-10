import React from "react";
import ReactDOM from "react-dom";
import App from "./packages/twitch-text-adventure/react/App";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./packages/twitch-text-adventure/react/theme";
import { createGame } from "./packages/twitch-text-adventure/createGame";
import { TwitchIntegration } from "./packages/ecs-twitch-integration/TwitchIntegration";

const system = createGame();

const twitchIntegration = new TwitchIntegration({
  username: process.env.REACT_APP_TTA_BOT_USERNAME!,
  token: process.env.REACT_APP_TTA_BOT_TOKEN!,
  channel: process.env.REACT_APP_TTA_BOT_CHANNEL!,
  onCommand: render,
});
system.modules.push(twitchIntegration);
twitchIntegration.start();

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App theme={theme} system={system} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
