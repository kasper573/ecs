import { Intro } from "../../intro/Intro";
import { PanelName } from "../types/PanelName";
import { PanelHeader, PanelHeaderProps } from "./PanelHeader";

export const InspectorPanelHeader = ({
  children,
  ...headerProps
}: Partial<PanelHeaderProps>) => (
  <PanelHeader
    {...headerProps}
    title={
      <Intro
        introId="WhatIsTheInspector"
        message={
          "The inspector lets you view more and change details about " +
          "a selection, ie. configure the components of an entity."
        }
      >
        <span>{PanelName.Inspector}</span>
      </Intro>
    }
  >
    {children}
  </PanelHeader>
);
