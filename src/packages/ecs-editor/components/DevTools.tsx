import React, { forwardRef, HTMLAttributes, useContext, useState } from "react";
import { IconButton, Slider, Tooltip } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "../store";
import { core } from "../core";
import { mockEditorState } from "../functions/mockEditorState";
import { NativeComponentsContext } from "../NativeComponentsContext";
import { GenerateIcon, SaveIcon } from "../icons";
import { useDialog } from "../hooks/useDialog";
import { selectECS } from "../selectors/selectECS";
import { SimpleDialog } from "./SimpleDialog";

export const DevTools = forwardRef<HTMLDivElement>(
  (props: HTMLAttributes<HTMLDivElement>, ref) => {
    const [mockSize, setMockSize] = useState(10);
    const dispatch = useDispatch();
    const ecs = useSelector(selectECS);
    const nativeComponents = useContext(NativeComponentsContext);

    const showSaveDialog = useDialog((props) => (
      <SimpleDialog title="State" {...props}>
        {props.open && <pre>{JSON.stringify(ecs, null, 2)}</pre>}
      </SimpleDialog>
    ));

    const mock = () =>
      dispatch(
        core.actions.setEditorState(mockEditorState(nativeComponents, mockSize))
      );
    return (
      <Actions ref={ref} {...props}>
        <Tooltip title={`Mock size ${mockSize}`}>
          <Slider
            value={mockSize}
            onChange={(e, value) => setMockSize(value as number)}
            color="secondary"
            getAriaValueText={(value) => `Mock size ${value}`}
            valueLabelDisplay="off"
            step={1}
            min={0}
            max={30}
            marks
          />
        </Tooltip>
        <Tooltip title={`Mock ${mockSize}`}>
          <IconButton aria-label={`Mock ${mockSize}`} onClick={mock}>
            <GenerateIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Serialize state">
          <IconButton aria-label="Serialize state" onClick={showSaveDialog}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </Actions>
    );
  }
);

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .MuiSlider-root {
    margin: 0 ${({ theme }) => theme.spacing(2)}px;
  }
`;
