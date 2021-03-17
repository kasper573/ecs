import React from "react";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { PanelHeader } from "../components/PanelHeader";
import { PanelName } from "../components/PanelName";
import { EntityInitializerIcon } from "../components/icons";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";

export type EntityInitializerEditorProps = {
  value: EntityInitializer;
};

export const EntityInitializerEditor = ({
  value,
}: EntityInitializerEditorProps) => (
  <>
    <PanelHeader title={PanelName.Inspector} />
    <InspectedObjectInfo icon={<EntityInitializerIcon />} name={value.name} />
  </>
);
