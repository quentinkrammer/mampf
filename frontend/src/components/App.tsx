import { Avatar } from "@mui/material";

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEYS, PAGES } from "../constants";
import { useMyUserData } from "../hooks/useMyUserData";
import { readLocalStorage } from "../util/localStorage";
import { NavigationDrawer } from "./NavigationDrawer";
import { LeaderLink } from "./LeaderLink";

function App() {
  useRedirectToAuthOrMyOrder();
  const { data } = useMyUserData();

  return (
    <div style={{ height: '100dvh', display: 'grid', gridTemplateRows: 'auto 1fr', gridAutoFlow: 'row' }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <NavigationDrawer />
        <LeaderLink />
        <Avatar>{data && data?.name.charAt(0)}</Avatar>
      </div>

      <div style={{ overflow: 'auto', height: '100%' }} >
        <Outlet />
      </div>
    </div>
  );
}

function useRedirectToAuthOrMyOrder() {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = readLocalStorage(LOCAL_STORAGE_KEYS.jwt);
    if (!jwt) {
      navigate(PAGES.auth);
      return;
    }
    navigate(PAGES.myOrder);
  }, [navigate]);
}



export default App;
