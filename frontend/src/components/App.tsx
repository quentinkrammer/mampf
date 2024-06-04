import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEYS, PAGES } from "../constants";
import { useActiveRoute } from "../hooks/useActiveRoute";
import { useMyUserData } from "../hooks/useMyUserData";
import { readLocalStorage } from "../util/localStorage";
import { NavigationDrawer } from "./NavigationDrawer";

function App() {
  useRedirectToAuthOrMyOrder();
  const { data } = useMyUserData();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <NavigationDrawer />
        <Avatar>{data && data?.name.charAt(0)}</Avatar>
      </div>

      <Outlet />
    </>
  );
}

function useRedirectToAuthOrMyOrder() {
  const navigate = useNavigate();
  const activeRoute = useActiveRoute();

  useEffect(() => {
    const jwt = readLocalStorage(LOCAL_STORAGE_KEYS.jwt);
    if (!jwt) {
      navigate(PAGES.auth);
      return;
    }
    navigate(PAGES.myOrder);
  }, [navigate, activeRoute]);
}

export default App;
