import { IconButton, Popover, Tooltip } from "@material-ui/core";
import { usePopupState } from "material-ui-popup-state/hooks";
import { bindPopover, bindToggle } from "material-ui-popup-state";
import styled from "styled-components";
import { EditIcon } from "../components/icons";
import { ECSScript } from "../../../ecs-serializable/src/definition/ECSScript";
import { CodeEditor } from "./CodeEditor";

export type ComponentPropertyDeclarationEditorProps = {
  value: ECSScript;
  onChange: (updated: ECSScript) => void;
};

export const ComponentPropertyDeclarationEditor = ({
  value,
  onChange,
}: ComponentPropertyDeclarationEditorProps) => {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "property-declaration-editor",
  });
  return (
    <>
      <Tooltip title="Open code editor">
        <IconButton size="small" {...bindToggle(popupState)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <CodeEditorPopover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={popupState.close}
      >
        <CodeEditorPopperContent>
          <CodeEditor
            value={value}
            onChange={onChange}
            options={{
              minimap: { enabled: false },
            }}
          />
        </CodeEditorPopperContent>
      </CodeEditorPopover>
    </>
  );
};

const CodeEditorPopover = styled(Popover)``;

const CodeEditorPopperContent = styled.div`
  display: flex;
  height: 150px;
  width: 550px;
  overflow: hidden;
`;
