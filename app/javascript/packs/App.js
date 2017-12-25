import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ErrorBoundary from "./ErrorBoundary";
import NavBar from "./NavBar";
import Welcome from "./Welcome";
import CoachRegister from "./CoachRegister";
import CoachLogin from "./CoachLogin";
import PlayerRegister from "./PlayerRegister";
import PlayerList from "./PlayerList";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#542e68',
    primary2Color: '#362347',
    accent1Color: '#d67010',
    accent2Color: '#a6570c'
  },
  fontFamily: "Roboto, sans-serif"
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router>
      <ErrorBoundary>
        <Route path="/" component={NavBar}/>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/register/coaches" component={CoachRegister}/>
        <Route exact path="/login/coaches" component={CoachLogin}/>
        <Route exact path="/register/players" component={PlayerRegister}/>
        <Route exact path="/players-list" component={PlayerList}/>
      </ErrorBoundary>
    </Router>
  </MuiThemeProvider>
);

export default App;
