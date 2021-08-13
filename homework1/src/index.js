import { ThemeProvider, createTheme } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { App } from "./App";
import { Chat, Welcome, Error404 } from "./pages";

//создаем тему
const theme = createTheme({
  dark: {
    color: "black",
  },
  light: {
    color: "white",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact={true} path="/chat" component={() => <Chat />} />
          <Route exact={true} path="/chat/:roomId" component={() => <Chat />} />
          <Route exact={true} path="/" component={() => <Welcome />} />
          <Route path="*" component={() => <Error404 />} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
