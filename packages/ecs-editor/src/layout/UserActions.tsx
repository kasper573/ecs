import styled from "styled-components";
import { Avatar, IconButton, MenuItem } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { MenuFor } from "../components/MenuFor";
import { UserIcon } from "../icons";

export const UserActions = () => {
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const logoutWithRedirect = () => logout({ returnTo: window.location.origin });

  return (
    <MenuFor
      items={[
        isAuthenticated ? (
          <MenuItem onClick={logoutWithRedirect}>Sign out</MenuItem>
        ) : (
          <MenuItem onClick={loginWithRedirect}>Sign in</MenuItem>
        ),
      ]}
    >
      {(props) => (
        <IconButton edge="end" {...props}>
          <SmallAvatar src={user?.picture} alt={user?.name}>
            <UserIcon />
          </SmallAvatar>
        </IconButton>
      )}
    </MenuFor>
  );
};

const SmallAvatar = styled(Avatar)`
  width: ${({ theme }) => theme.spacing(3)}px;
  height: ${({ theme }) => theme.spacing(3)}px;
  color: inherit;
  background-color: transparent;
`;
