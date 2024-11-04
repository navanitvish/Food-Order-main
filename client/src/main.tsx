import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

import { store } from "./app-store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
        <ReactQueryDevtools
          initialIsOpen
          position="right"
          buttonPosition="bottom-right"
        />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
