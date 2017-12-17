import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import ErrorBoundary from "./ErrorBoundary";
// const history = createHistory();

const App = () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <Route path="/" component={() => <h1>Booyah</h1>}/>
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;