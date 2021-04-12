import { v4 } from "uuid";

export const uuid = <T extends string>() => v4() as T;
