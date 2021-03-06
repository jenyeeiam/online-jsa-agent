import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Divider from 'material-ui/Divider';
import { Link } from "react-router-dom";
import InfoPage from "./InfoPage";

const buttonStyle = {
  height: '60px',
  width: '150px',
  borderRadius: '10px'
};

const labelStyle = {
  fontSize: '18px',
  marginTop: '20px',
  lineHeight: '60px'
}

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      descriptionVisible: false
    }
  }

  handleClick() {
    this.setState({descriptionVisible: !this.state.descriptionVisible})
  }

  render() {
    const {descriptionVisible} = this.state;
    const signedIn = !!localStorage.getItem('token');

    return <div className="welcome-container">
      {signedIn && <InfoPage/>}
      {!signedIn &&<div className="login-register">
        <h1>connecting japanese professional softball teams with foreign players</h1>
        {!descriptionVisible && <p className="fake-button">
          <span onClick={this.handleClick}>How does it work?</span>
        </p>}
        {descriptionVisible && (<div>
          <p className='description'>Nippon Softball connects foreign players with Japanese professional coaches by providing a platform for communication. Players provide their information, accolades and skills videos as a method to sell themselves to coaches. Like applying for a job, not all submissions will be successful as there are only a few spots available every year for foreign players in Japan. Good luck!</p>
          <p className="fake-button"><span onClick={this.handleClick}>Hide</span></p>
        </div>)}
        <div className="welcome-buttons">
          <h3>Register 登録する</h3>
          <div className="login-btn">
            <Link to="/register/players">
              <RaisedButton
                label="Players"
                primary={true}
                style={buttonStyle}
                labelStyle={labelStyle}
              />
            </Link>
          </div>
          <div className="login-btn">
            <Link to="/register/coaches">
              <RaisedButton
                label="コーチとして"
                secondary={true}
                labelStyle={labelStyle}
                style={buttonStyle}
              />
            </Link>
          </div>
        </div>
      </div>}
    </div>
  }

}
