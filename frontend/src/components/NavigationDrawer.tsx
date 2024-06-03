import { Fastfood, Home } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { css } from "goober";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { PAGES } from "../constants";
import { Omit } from "../types";

const PAGES_NAVBAR_DATA_MAP: Omit<
  Record<keyof typeof PAGES, { label: string; icon: ReactNode }>,
  "auth"
> = {
  root: { label: "Home", icon: <Home /> },
  myOrder: { label: "My Order", icon: <Fastfood /> },
};

export function NavigationDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
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
              ([route, { icon, label }]) => (
                <ListItem key={route} className={styles.linkListItem}>
                  <Link
                    to={PAGES[route as keyof typeof PAGES]}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{label}</ListItemText>
                  </Link>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}

const styles = {
  linkListItem: css({ "&:hover": { background: "rgba(0, 0, 0, 0.04)" } }),
};