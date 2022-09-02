import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Theme from "./config/theme/index";
import { ThemeProvider } from "@mui/material/styles";

import Microsite from "./page/microsite";

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Switch>
          <Route path="/test" exact>
            <Microsite />
          </Route>
          <Route path="/">
            <h1>Home</h1>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
