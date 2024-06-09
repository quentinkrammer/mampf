import { Fastfood, Groups, ListAlt, Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { css } from "goober";
import { ReactNode, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LOCAL_STORAGE_KEYS, PAGES } from "../constants";
import { requestHeaders } from "../fetch";
import { useActiveRoute } from "../hooks/useActiveRoute";
import { useMyUserData } from "../hooks/useMyUserData";
import { Omit } from "../types";
import { deleteLocalStorage } from "../util/localStorage";

const PAGES_NAVBAR_DATA_MAP: Omit<
  Record<keyof typeof PAGES, { label: string; icon: ReactNode }>,
  "auth"
> = {
  myOrder: { label: "My Order", icon: <Fastfood /> },
  allOrders: { label: "All Orders", icon: <ListAlt /> },
  shopTeam: { label: "Shop Team", icon: <Groups /> },
};

export function NavigationDrawer() {
  const [open, setOpen] = useState(false);
  const activeRoute = useActiveRoute();
  const { data: userData } = useMyUserData();
  const isNotLoggedIn = !userData;
  const queryClient = useQueryClient();
  const anchorRef = useRef<HTMLAnchorElement>(null)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const onLogout = () => {
    // pretend i am sending a request to the backend to blacklist the jwt
    deleteLocalStorage(LOCAL_STORAGE_KEYS.jwt);
    requestHeaders.delete("Authorization");
    queryClient.clear();
    window.location.reload();
  };

  return (
    <div className={classNames({ [styles.invisible]: isNotLoggedIn })}>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {Object.entries(PAGES_NAVBAR_DATA_MAP).map(
              ([route, { icon, label }]) => {
                const isActiveRoute = route === activeRoute;
                return (
                  <ListItem
                    key={route}
                    className={classNames(styles.linkListItem, {
                      [styles.activeLink]: isActiveRoute,
                    })}
                  >
                    <Link
                      ref={anchorRef}
                      to={PAGES[route as keyof typeof PAGES]}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#FFF",
                        width: '100%',
                      }}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{label}</ListItemText>
                    </Link>
                  </ListItem>
                );
              },
            )}
          </List>
        </Box>
        <Button
          onClick={onLogout}
          style={{ marginTop: "auto" }}
          startIcon={<Logout />}
        >
          <Typography>Logout</Typography>
        </Button>
      </Drawer>
    </div>
  );
}

const styles = {
  linkListItem: css({ "&:hover": { background: "rgba(255, 255, 255, 0.08)" } }),
  activeLink: css({
    background: "rgba(255, 255, 255, 0.08)",
    "&&:hover": { background: "rgba(255, 255, 255, 0.16)" },
  }),
  invisible: css({ visibility: "hidden" }),
};
