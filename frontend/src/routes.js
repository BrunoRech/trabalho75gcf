import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard, CadastroProduto } from "./pages";
import Menu from "./components/layout/Menu";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <div style={{ display: "flex" }}>
          <Menu />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/produtos" component={CadastroProduto} />
      </div>
    </Switch>
  </BrowserRouter>
);

export default Routes;
