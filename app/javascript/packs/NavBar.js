import React from "react";
import { Link, Redirect } from "react-router-dom";
import logo from './logo.png';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    };
  }

  componentDidMount() {
    this.setState({signedIn: !!localStorage.getItem('token')})
  }

  handleSignOut() {
    this.setState({signedIn: false})
  }

  render() {
    const {signedIn} = this.state;
    const ifHome = this.props.history.location.pathname === '/';

    return <div className="nav-bar">
      <div className="logo">
        <Link to='/'>
          <img src={logo} alt="logo" />
        </Link>
      </div>
        {signedIn && <span className='logout-btn' onClick={this.handleSignOut}>Logout</span>}
    </div>
  }

}
