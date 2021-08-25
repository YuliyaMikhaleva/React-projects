import { createTheme } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; //импортируем провайдер

import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { App } from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { DefaultThemeProvider } from "./components/theme-context";
import { Chat, Welcome, Error404 } from "./pages";
import Profile from "./pages/profile";
import { persistore, store } from "./store"; //импортируем store из нашей папочки store

// создаем тему material
// const theme = createTheme({
//   синяя: {
//     color: "blue",
//   },
//   черная: {
//     color: "black",
//   },
// });

//наш вариант тем
const themes = {
  мятная: createTheme({
    color: "#b2dfee",
  }),
  синяя: createTheme({
    color: "#007cad",
  }),
  черная: createTheme({
    color: "black",
  }),
};

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistore}>
        <BrowserRouter>
          <DefaultThemeProvider themes={themes} initialTheme={"мятная"}>
            <Switch>
              <Route exact={true} path="/chat" component={() => <Chat />} />
              <Route exact={true} path="/chat/:roomId" component={() => <Chat />} />
              <Route exact={true} path="/" component={() => <Welcome />} />
              <Route exact={true} path="/profile" component={() => <Profile />} />
              <Route path="*" component={() => <Error404 />} />
            </Switch>
          </DefaultThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root"),
);
