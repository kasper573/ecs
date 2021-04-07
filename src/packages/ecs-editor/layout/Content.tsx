import { Button } from "@material-ui/core";
import styled from "styled-components";
import { useSelector } from "../store";
import { selectHasSystems } from "../selectors/selectHasSystems";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { useSystemCrud } from "../hooks/useSystemCrud";
import { Center } from "../components/Center";
import { SystemHeader } from "./SystemHeader";
import { PanelContainer } from "./PanelContainer";
import { RuntimePanel } from "./RuntimePanel";
import { InspectorPanel } from "./InspectorPanel";
import { HierarchyPanel } from "./HierarchyPanel";
import { LibraryPanel } from "./LibraryPanel";

export const Content = () => {
  const hasSystem = useSelector(selectHasSystems);
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const { showCreateDialog, showSelectDialog } = useSystemCrud();
  if (!selectedSystem) {
    return (
      <SystemCrudButtons>
        {hasSystem && (
          <Button variant="outlined" color="primary" onClick={showSelectDialog}>
            Select system
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={showCreateDialog}>
          New system
        </Button>
      </SystemCrudButtons>
    );
  }
  return (
    <>
      <SystemHeader />
      <PanelContainer>
        <LibraryPanel />
        <HierarchyPanel />
        <InspectorPanel />
        <RuntimePanel />
      </PanelContainer>
    </>
  );
};

const SystemCrudButtons = styled(Center)`
  .MuiButton-root + .MuiButton-root {
    margin-top: ${({ theme }) => theme.spacing(1)}px;
  }
`;
