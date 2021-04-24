import { ChangeEvent, useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import styled from "styled-components";
import { Panel } from "../../components/Panel";
import { PanelName } from "../../types/PanelName";
import { RuntimePanel } from "./RuntimePanel";

export const TabsPanel = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (e: ChangeEvent<{}>, i: number) => setTabIndex(i);

  return (
    <Panel variant="row" name={PanelName.Tabs}>
      <VerticalTabs value={tabIndex} onChange={handleChange}>
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </VerticalTabs>
      <RuntimePanel elevation={0} />
    </Panel>
  );
};

const VerticalTabs = styled(Tabs).attrs({
  orientation: "vertical",
  variant: "scrollable",
})`
  border-right: 1px solid ${({ theme }) => theme.palette.divider};
`;
