import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { DbResetMenu } from "./components/DbResetMenu";
import "./index.css";
import { router } from "./router";
const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <DbResetMenu />
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
