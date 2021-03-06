import React from "react";
import { Router, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ErrorBoundary from "./ErrorBoundary";
import NavBar from "./NavBar";
import Welcome from "./Welcome";
import CoachRegister from "./CoachRegister";
import Login from "./Login";
import PlayerRegister from "./PlayerRegister";
import EditProfile from "./EditProfile";
import PlayerList from "./PlayerList";
import NewMessage from "./NewMessage";
import MessagesCoaches from "./MessagesCoaches";
import MessagesPlayers from "./MessagesPlayers";
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory();

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
    <Router history={history}>
      <ErrorBoundary>
        <Route path="/" component={NavBar}/>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/register/coaches" component={CoachRegister}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register/players" component={PlayerRegister}/>
        <Route exact path="/player/:player_id/edit" component={EditProfile} />
        <Route exact path="/players-list" component={PlayerList}/>
        <Route exact path="/message/:player_id" component={NewMessage} />
        <Route exact path="/my-messages/coach" component={MessagesCoaches} />
        <Route exact path="/my-messages/player" component={MessagesPlayers} />
      </ErrorBoundary>
    </Router>
  </MuiThemeProvider>
);

export default App;
