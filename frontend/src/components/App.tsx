import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEYS, PAGES } from "../constants";
import { readLocalStorage } from "../util/localStorage";

function App() {
  useRedirectToAuth();

  return (
    <>
      <NavigationDrawer />

      <Outlet />
    </>
  );
}

function NavigationDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

function useRedirectToAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = readLocalStorage(LOCAL_STORAGE_KEYS.jwt);
    console.log(jwt);
    if (!jwt) {
      navigate(PAGES.auth);
      return;
    }
    navigate(PAGES.myOrder);
  }, [navigate]);
}

export default App;
