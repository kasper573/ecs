import { WindowId } from "./WindowId";

export type WindowDefinition = {
  id: WindowId;
  title: string;
  content: JSX.Element;
};
