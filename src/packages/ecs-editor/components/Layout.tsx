import React, { MouseEvent, PropsWithChildren } from "react";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { ScenesPanel } from "../panels/ScenesPanel";
import { FileMenu } from "../panels/FileMenu";
import { AppBarContent } from "./AppBarContent";

export type LayoutProps = PropsWithChildren<{}>;

/**
 * A layout component that wraps children in a responsive container that always has an AppBar and Drawer.
 * On desktop the drawer is permanent and on mobile it is toggled.
 */
export const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <div>
      <div className={classes.toolbarSpacing}>
        <FileMenu />
      </div>
      <Divider />
      <ScenesPanel />
    </div>
  );

  return (
    <div className={classes.root} onContextMenu={disableContextMenu}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <AppBarContent />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbarSpacing} />
        {children}
      </main>
    </div>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      [theme.breakpoints.up("sm")]: {
        height: "100%", // Fixes container size to trigger overflows
      },
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbarSpacing: {
      ...theme.mixins.toolbar,
      padding: theme.spacing(2),
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      padding: theme.spacing(1),
    },
  })
);

// Disable any unhandled context menus
const disableContextMenu = (e: MouseEvent) => e.preventDefault();
