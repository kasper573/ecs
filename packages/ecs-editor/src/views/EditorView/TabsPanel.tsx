import { ChangeEvent, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Panel } from "../../components/Panel";
import { PanelName } from "../../types/PanelName";
import { RuntimePanel } from "./RuntimePanel";

export const TabsPanel = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (e: ChangeEvent<{}>, i: number) => setTabIndex(i);

  return (
    <Panel name={PanelName.Tabs}>
      <AppBar position="static">
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>
      <RuntimePanel elevation={0} />
    </Panel>
  );
};
