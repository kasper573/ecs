import * as zod from "zod";

export type ECSScript = zod.infer<typeof ecsScriptSchema>;

export const ecsScriptSchema = zod.object({
  code: zod.string(),
});
