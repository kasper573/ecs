import { memo } from "react";
import { useSelector } from "../store";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { Home } from "./Home";
import { Editor } from "./Editor";

export const Routes = memo(() => {
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  if (!selectedSystem) {
    return <Home />;
  }
  return <Editor />;
});
