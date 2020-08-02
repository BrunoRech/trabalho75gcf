import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard, Products, Customers } from "./pages";
import Menu from "./components/layout/Menu";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <div style={{ display: "flex" }}>
          <Menu />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/customers" component={Customers} />
      </div>
    </Switch>
  </BrowserRouter>
);

export default Routes;
