import { push } from "connected-react-router";
import { IconButton, OutlinedInput, Tooltip } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useRootSelector } from "../../store";
import { selectSelectedSystemDefinition } from "../../selectors/selectSelectedSystemDefinition";
import { usePrevious } from "../../hooks/usePrevious";
import { BackIcon } from "../../components/icons";
import { core } from "../../core";
import { debounced } from "../../../../ecs-common/debounced";

export const EditorTitle = () => {
  const dispatch = useDispatch();
  const selectedSystem = useRootSelector(selectSelectedSystemDefinition);
  const previousSystem = usePrevious(selectedSystem);
  const displayedSystem = selectedSystem ?? previousSystem;
  const goHome = () => dispatch(push("/"));
  const renameSystem = (name: string) =>
    dispatch(
      core.actions.renameSystemDefinition({
        systemId: selectedSystem!.id,
        name,
      })
    );

  return (
    <>
      <Tooltip title="Home">
        <IconButton edge="start" onClick={goHome}>
          <BackIcon />
        </IconButton>
      </Tooltip>
      {displayedSystem && (
        <Title value={displayedSystem.name} onChange={renameSystem} />
      )}
    </>
  );
};

const Title = styled(
  debounced(OutlinedInput, (e: HTMLInputElement) => e.value)
).attrs({
  margin: "dense",
})`
  margin: 0 ${({ theme }) => theme.spacing(1.5)}px;
  &:not(:hover) .MuiOutlinedInput-notchedOutline {
    display: none;
  }
`;
