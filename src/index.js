import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {store,persistor } from '../src/store'
import { Provider } from 'react-redux'
import ThemeProvider from "./components/ThemeProvider";
import { PersistGate } from "redux-persist/integration/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
</PersistGate>
);
