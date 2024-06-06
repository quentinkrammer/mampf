import { createBrowserRouter } from "react-router-dom";
import { AllOrdersPage } from "./components/AllOrdersPage";
import App from "./components/App";
import { AuthPage } from "./components/AuthPage";
import { MyOrderPage } from "./components/MyOrderPage";
import { PAGES } from "./constants";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: PAGES.auth, element: <AuthPage /> },
      { path: PAGES.myOrder, element: <MyOrderPage /> },
      { path: PAGES.allOrders, element: <AllOrdersPage /> },
    ],
  },
]);
