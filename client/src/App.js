import React, { useState, useEffect } from "react";
import SignIn from "views/SignIn";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";
// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import { CircularProgress } from "@material-ui/core";
const hist = createBrowserHistory();
function App() {
  const [isLoading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
     
  }, []);
  if (isLoading) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <GridItem item xs={12} sm={12} md={12}>
          <CircularProgress />
        </GridItem>
      </Grid>
    );
  }
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/admin" component={Admin} />
        <Route path="/rtl" component={RTL} />
        {/* <Redirect from="/" to="/admin/dashboard" /> */}
      </Switch>
    </Router>
  );
}

export default App;
