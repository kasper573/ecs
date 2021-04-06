import React, { useEffect, useState } from "react";
import { System } from "../../ecs/System";

export const RenderTarget = ({ system }: { system: System }) => {
  const [renderTarget, setRenderTarget] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    system.setContext("renderTarget", renderTarget);
  }, [system, renderTarget]);
  return <div ref={setRenderTarget} />;
};
