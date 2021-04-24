import { ChangeEvent, useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import styled from "styled-components";
import { Panel } from "../../components/Panel";
import { PanelName } from "../../types/PanelName";
import { ClosableTab } from "../../components/ClosableTab";
import { RuntimePanel } from "./RuntimePanel";

export const TabsPanel = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (e: ChangeEvent<{}>, i: number) => setTabIndex(i);

  return (
    <Panel variant="row" name={PanelName.Tabs}>
      <VerticalTabs value={tabIndex} onChange={handleChange}>
        <ClosableTab label="Item one" />
        <ClosableTab label="Item Two" />
        <ClosableTab label="Item Three" />
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
