import React, { useContext, useState } from "react";
import { IconButton, Slider, Tooltip } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch } from "../store";
import { core } from "../core";
import { mockEditorState } from "../functions/mockEditorState";
import { NativeComponentsContext } from "../NativeComponentsContext";
import { GenerateIcon } from "./icons";

export const DevTools = () => {
  const [mockSize, setMockSize] = useState(10);
  const dispatch = useDispatch();
  const nativeComponents = useContext(NativeComponentsContext);

  const mock = () =>
    dispatch(
      core.actions.setEditorState(mockEditorState(nativeComponents, mockSize))
    );
  return (
    <Actions>
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
    </Actions>
  );
};

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  align-items: center;
  .MuiSlider-root {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }
`;
