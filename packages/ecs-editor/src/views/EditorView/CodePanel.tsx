import { ChangeEvent, memo } from "react";
import Tabs from "@material-ui/core/Tabs";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { Panel } from "../../components/Panel";
import { PanelName } from "../../types/PanelName";
import { ClosableTab } from "../../components/ClosableTab";
import { CodeEditor } from "../../editors/CodeEditor";
import { useDispatch, useSelector } from "../../store";
import { selectListOfCodeFile } from "../../features/codeFile/selectListOfCodeFile";
import { core } from "../../core";
import { selectSelectedCodeFile } from "../../features/codeFile/selectSelectedCodeFile";
import { CodeFileId } from "../../features/codeFile/CodeFile";
import { Center } from "../../components/Center";
import { ECSScript } from "../../../../ecs-serializable/src/definition/ECSScript";

export const CodePanel = memo(() => {
  const dispatch = useDispatch();
  const files = useSelector(selectListOfCodeFile);

  const selectedFile = useSelector(selectSelectedCodeFile);
  const selectedIndex = files.findIndex((file) => file.id === selectedFile?.id);

  const handleTabChange = (e: ChangeEvent<{}>, newIndex: number) => {
    dispatch(core.actions.selectCodeFile(files[newIndex].id));
  };

  const closeSelectedFile = (id: CodeFileId) =>
    dispatch(core.actions.closeCodeFile(id));

  const handleCodeChange = (script: ECSScript) => {
    if (selectedFile) {
      dispatch(
        core.actions.setComponentDefinitionScript({
          id: selectedFile.id,
          script,
        })
      );
    }
  };

  return (
    <Panel variant="row" name={PanelName.Code}>
      <VerticalTabs
        value={selectedIndex !== -1 ? selectedIndex : false}
        onChange={handleTabChange}
      >
        {files.map((file) => (
          <ClosableTab
            key={file.id}
            label={file.name}
            onClose={() => closeSelectedFile(file.id)}
          />
        ))}
      </VerticalTabs>
      <TabContent>
        {selectedFile ? (
          <CodeEditor
            value={selectedFile.content}
            onChange={handleCodeChange}
          />
        ) : (
          <Center>
            <Typography>No script selected</Typography>
          </Center>
        )}
      </TabContent>
    </Panel>
  );
});

const TabContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const VerticalTabs = styled(Tabs).attrs({
  orientation: "vertical",
  variant: "scrollable",
})`
  border-right: 1px solid ${({ theme }) => theme.palette.divider};
`;
