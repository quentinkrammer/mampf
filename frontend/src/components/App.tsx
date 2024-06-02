import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEYS, PAGES } from "../constants";
import { readLocalStorage } from "../util/localStorage";

function App() {
  useRedirectToAuth();

  return (
    <>
      <div>{"NavBar"}</div>

      <Outlet />
    </>
  );
}

function useRedirectToAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = readLocalStorage(LOCAL_STORAGE_KEYS.jwt);
    if (!jwt) {
      navigate(PAGES.auth);
    }
    navigate(PAGES.myOrder);
  }, [navigate]);
}

export default App;
