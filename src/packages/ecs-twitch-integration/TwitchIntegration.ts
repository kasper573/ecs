import { Client as TmiClient } from "tmi.js";
import { SystemModule } from "../ecs/SystemModule";
import { performCommand } from "../ecs-interactive/performCommand";
import { InteractionResult } from "../ecs-interactive/InteractionResult";
import { System } from "../ecs/System";

export class TwitchIntegration implements SystemModule {
  system?: System;
  private tmiClient: TmiClient;
  constructor({
    channel,
    username,
    token,
    onCommand,
  }: TwitchIntegrationOptions) {
    this.tmiClient = new TmiClient({
      options: { debug: true },
      connection: {
        secure: true,
        reconnect: true,
      },
      identity: {
        username,
        password: token,
      },
      channels: [channel],
    });

    this.tmiClient.on("message", (channel, tags, message, self) => {
      // Don't do anything without a system and ignore echoed messages.
      if (!this.system || self) return;

      const match = /!command (.+)/.exec(message);
      if (this.system && match) {
        onCommand(performCommand(this.system, match[1]));
      }
    });
  }

  start() {
    return this.tmiClient.connect();
  }

  stop() {
    return this.tmiClient.disconnect();
  }
}

export type TwitchIntegrationOptions = {
  username: string;
  token: string;
  channel: string;
  onCommand: (result: InteractionResult | undefined) => void;
};
