import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEYS, PAGES } from "../constants";
import { readLocalStorage } from "../util/localStorage";
import { NavigationDrawer } from "./NavigationDrawer";

function App() {
  useRedirectToAuthOrMyOrder();

  return (
    <>
      <NavigationDrawer />
      <Outlet />
    </>
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
