import { Button } from "@material-ui/core";
import styled from "styled-components";
import { ComponentDefinition } from "../../../ecs-serializable/src/definition/ComponentDefinition";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { ComponentDefinitionIcon } from "../components/icons";
import { useDispatch } from "../store";
import { core } from "../core";

export type ComponentDefinitionEditorProps = {
  value: ComponentDefinition;
};

export const ComponentDefinitionEditor = ({
  value,
}: ComponentDefinitionEditorProps) => {
  const dispatch = useDispatch();
  const openFile = () => dispatch(core.actions.openCodeFile(value.id));
  return (
    <>
      <InspectedObjectInfo
        icon={<ComponentDefinitionIcon />}
        name={value.name}
      />
      <Content>
        <Button variant="contained" onClick={openFile}>
          Edit component script
        </Button>
      </Content>
    </>
  );
};

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  justify-content: center;
`;
