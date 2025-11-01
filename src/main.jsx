import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./config/theme"; // File bạn tự định nghĩa theme MUI

// --- Giả lập các Provider bạn sẽ cần ---
// import { store } from './store/store';
// import { Provider } from 'react-redux';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* // Khi bạn setup Redux, hãy bọc App trong <Provider>
      // <Provider store={store}>
    */}
    {/* // Khi bạn setup React Query, hãy bọc App trong <QueryClientProvider>
      // <QueryClientProvider client={queryClient}>
    */}

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>

    {/* // </QueryClientProvider>
     */}
    {/* // </Provider>
     */}
  </React.StrictMode>
);
