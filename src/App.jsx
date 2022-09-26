import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Theme from "./config/theme/index";
import { ThemeProvider } from "@mui/material/styles";

// Admin
import Login from "@/page/Auth/Login";
import Order from "@/page/admin/Order";
import Payment from "@/page/admin/Payment";
import Shipping from "@/page/admin/Shipping";

import PaymentHistory from "@/page/admin/Report/Payment";

import Home from "./page/Home";


import Microsite from "./page/microsite";
import Status from "./page/Status";

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Switch>
          <Route path="/order-list" exact>
            <Order />
          </Route>
          <Route path="/payment-list" exact>
            <Payment />
          </Route>
          <Route path="/shipping" exact>
            <Shipping />
          </Route>

          <Route path="/payment-history" exact>
            <PaymentHistory />
          </Route>

          <Route path="/payment/:id" exact>
            <Microsite />
          </Route>
          <Route path="/status-payment/:id" exact>
            <Status />
          </Route>

          <Route path="/sign-in" exact>
            <Login />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
