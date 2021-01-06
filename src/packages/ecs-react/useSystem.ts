import { useReducer, useState } from "react";
import { System } from "../ecs/System";
import { performCommand } from "../ecs-interactive/performCommand";
import { InteractionResult } from "../ecs-interactive/InteractionResult";

export const useSystem = <SystemState>(system: System<SystemState>) => {
  const [interactionResult, setInteractionResult] = useState<
    InteractionResult | undefined
  >();
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const performAndSaveResult = (command: string) => {
    const result = performCommand(system, command);
    setInteractionResult(result);
    forceRender();
  };
  return {
    perform: performAndSaveResult,
    interactionResult,
  };
};
