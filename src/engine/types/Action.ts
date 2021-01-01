import { Effect } from "./Effect";
import { Context } from "./Context";

export type Action = {
  name: string;
  perform: (context: Context) => Effect | undefined;
};
