import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import { AuthPage } from "./components/AuthPage";
import { MyOrderPage } from "./components/MyOrderPage";
import { PAGES } from "./constants";

export const router = createBrowserRouter([
  {
    path: PAGES.root,
    element: <App />,
    children: [
      { path: PAGES.auth, element: <AuthPage /> },
      { path: PAGES.myOrder, element: <MyOrderPage /> },
    ],
  },
]);
