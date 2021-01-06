import { InteractionResult } from "./InteractionResult";

export type Action = {
  name: string;
  perform: () => InteractionResult | undefined;
};
