import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Register from "./pages/Register";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Logon} />
        <Route path='/register' component={Register} />

        <Route path='/product' component={Product} />
        <Route path='/products/new' component={NewProduct} />
      </Switch>
    </BrowserRouter>
  );
}
