import React, { Component } from "react";
// import PropTypes from 'prop-types';

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  Router,
  Route,
  // Link,
  Switch
} from "react-router-dom";

import { createBrowserHistory } from "history";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
// pick utils
import MomentUtils from "@date-io/moment";

import withTracker from "./withTracker";

import Home from "./pages/Home";
import EventList from "./pages/EventList";
import EventDeails from "./pages/EventDeails";
import Test from "./pages/Test";

const theme = createMuiTheme({
  palette: {
    type: "dark" // Switching the dark mode on is a single property value change.
  },
  typography: {
    useNextVariants: true
  }
});

const history = createBrowserHistory();

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router history={history}>
            <Switch>
              <Route path="/event/:id" component={withTracker(EventDeails)} />
              <Route path="/" component={withTracker(Home)} />
            </Switch>
          </Router>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
