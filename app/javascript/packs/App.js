import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ErrorBoundary from "./ErrorBoundary";
import Welcome from "./Welcome";
import CoachRegister from "./CoachRegister";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#542e68',
    primary2Color: '#362347',
    accent1Color: '#d67010',
    accent2Color: '#a6570c'
  },
  fontFamily: "Montserrat, Roboto, sans-serif"
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router>
      <ErrorBoundary>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/register/coaches" component={CoachRegister}/>
      </ErrorBoundary>
    </Router>
  </MuiThemeProvider>
);

export default App;