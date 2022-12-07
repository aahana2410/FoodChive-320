import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { store } from './app/store';
import { Provider } from 'react-redux';

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
} else console.log(process.env.NODE_ENV);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);