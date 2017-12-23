import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";

export default function Welcome() {
  return <div className="welcome-container">
    <div className="login-register">
      <h1>connecting japanese professional softball teams with foreign players</h1>
      <div className="login-btn">
        <Link to="/login">
          <RaisedButton
            label="Login"
            primary={true}
          />
        </Link>
      </div>
      <div className="login-btn">
        <Link to="/register/coaches">
          <RaisedButton
            label="Coaches Sign Up"
            secondary={true}
          />
        </Link>
      </div>
      <div className="login-btn">
        <Link to="/register/players">
          <RaisedButton
            label="Player Sign Up"
            secondary={true}
          />
        </Link>
      </div>
    </div>
  </div>
}