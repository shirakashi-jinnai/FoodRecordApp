import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import teststore from "./reducks/store/store";
// eslint-disable-next-line no-unused-vars
import * as History from "history";
import { theme } from "./asetts/theme";
// eslint-disable-next-line no-unused-vars
import { ThemeProvider } from "@material-ui/styles";
import { MuiThemeProvider } from "@material-ui/core";
import App from "./App";

const history = createBrowserHistory();
export const store = teststore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
