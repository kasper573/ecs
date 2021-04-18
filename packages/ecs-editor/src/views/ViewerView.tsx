import { useContext, useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { useLocation } from "react-router";
import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";
import { System } from "../../../ecs/src/System";
import { createSystem } from "../../../ecs-serializable/src/functions/createSystem";
import { DeserializationMemory } from "../../../ecs-serializable/src/DeserializationMemory";
import { RenderTarget } from "../../../ecs-render-target/RenderTarget";
import { parseECSDefinition } from "../../../ecs-serializable/src/parseECSDefinition";
import { getSystem } from "../../../ecs-api-client/getSystem";
import { NativeComponentsContext } from "../NativeComponentsContext";
import { viewerRoute } from "../routes/viewerRoute";

export const ViewerView = () => {
  const location = useLocation();
  const { id } = viewerRoute.match(location)?.params ?? {};
  const nativeComponents = useContext(NativeComponentsContext);
  const [system, setSystem] = useState<System>();
  const [systemName, setSystemName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetch(id: SystemDefinitionId) {
      const result = await getSystem(id);
      if (result.type === "error") {
        setError("Could not get system for specified id");
        return;
      }
      const ecs = parseECSDefinition(result.ecs);
      if (!ecs) {
        setError("Could not parse system definition");
        return;
      }

      setSystemName(ecs.systems[id]?.name);
      setSystem(
        createSystem(ecs, new DeserializationMemory(), nativeComponents)
      );
    }

    setSystemName("");
    setError("");
    if (id) {
      fetch(id);
    }
  }, [id, nativeComponents]);

  document.title = systemName;
  if (!id) {
    return <Typography>No system id specified</Typography>;
  }
  if (error) {
    return <Typography>{error}</Typography>;
  }
  if (!system) {
    return null;
  }
  return <RenderTarget system={system} />;
};
