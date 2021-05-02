import React, {
  forwardRef,
  HTMLAttributes,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  IconButton,
  ListItemSecondaryAction,
  Slider,
  Tooltip,
} from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "../store";
import { core } from "../core";
import { mockEditorState } from "../functions/mockEditorState";
import { NativeComponentsContext } from "../NativeComponentsContext";
import { SimpleDialog } from "../dialogs/SimpleDialog";
import { selectAll } from "../selectors/selectAll";
import { GenerateIcon, SaveIcon } from "./icons";

export const DevTools = forwardRef<HTMLDivElement>(
  (props: HTMLAttributes<HTMLDivElement>, ref) => {
    const ecsPreviewRef = useRef<HTMLTextAreaElement>(null);
    const [isECSPreviewDialogOpen, setECSPreviewDialogOpen] = useState(false);
    const [mockSize, setMockSize] = useState(10);
    const dispatch = useDispatch();
    const state = useSelector(selectAll);
    const serializedState = useMemo(() => JSON.stringify(state, null, 2), [
      state,
    ]);
    const nativeComponents = useContext(NativeComponentsContext);

    const mock = () =>
      dispatch(
        core.actions.setEditorState(mockEditorState(nativeComponents, mockSize))
      );

    const copyECSToClipboard = () => {
      const textArea = ecsPreviewRef.current!;
      textArea.select();
      textArea.setSelectionRange(0, textArea.value.length);
      document.execCommand("copy");
      textArea.setSelectionRange(0, 0);
    };

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
          <IconButton
            aria-label="Serialize state"
            onClick={() => setECSPreviewDialogOpen(true)}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
        <SimpleDialog
          fullWidth
          maxWidth="sm"
          open={isECSPreviewDialogOpen}
          title={
            <>
              State
              <ListItemSecondaryAction>
                <Tooltip title="Copy to clipboard">
                  <IconButton
                    edge="end"
                    aria-label="Copy to clipboard"
                    onClick={copyECSToClipboard}
                  >
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </>
          }
          onClose={() => setECSPreviewDialogOpen(false)}
        >
          {isECSPreviewDialogOpen && (
            <StatePreview
              ref={ecsPreviewRef}
              value={serializedState}
              readOnly
            />
          )}
        </SimpleDialog>
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

const StatePreview = styled.textarea`
  width: 100%;
  height: 50vh;
`;
