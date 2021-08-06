import {ThemeProvider, createTheme} from "@material-ui/core"
import React from "react";
import ReactDOM from "react-dom";

import {App} from "./App";

//создаем тему
const theme = createTheme({
    dark: {
        color: "black"
    },
    light: {
        color: "white"
    }
})

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);
