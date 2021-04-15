import { push } from "connected-react-router";
import { Fade, IconButton, Tooltip, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "../../store";
import { selectSelectedSystemDefinition } from "../../selectors/selectSelectedSystemDefinition";
import { usePrevious } from "../../hooks/usePrevious";
import { BackIcon } from "../../components/icons";

export const EditorTitle = () => {
  const dispatch = useDispatch();
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const previousSystem = usePrevious(selectedSystem);
  const displayedSystem = selectedSystem ?? previousSystem;
  const goHome = () => dispatch(push("/"));

  return (
    <Fade in={!!selectedSystem}>
      <div>
        <Tooltip title="Home">
          <IconButton edge="start" onClick={goHome}>
            <BackIcon />
          </IconButton>
        </Tooltip>
        <Title>{displayedSystem?.name}</Title>
      </div>
    </Fade>
  );
};

const Title = styled(Typography).attrs({
  component: "span",
  noWrap: true,
})`
  margin: 0 ${({ theme }) => theme.spacing(1.5)}px;
`;
