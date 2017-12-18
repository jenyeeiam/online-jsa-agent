import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ErrorBoundary from "./ErrorBoundary";
import Welcome from "./Welcome";
import CoachRegister from "./CoachRegister";

const App = () => (
  <MuiThemeProvider>
    <Router>
      <ErrorBoundary>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/register/coaches" component={CoachRegister}/>
      </ErrorBoundary>
    </Router>
  </MuiThemeProvider>
);

export default App;