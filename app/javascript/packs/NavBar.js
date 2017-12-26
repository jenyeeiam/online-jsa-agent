import React from "react";
import { Link, Redirect } from "react-router-dom";
import logo from './logo.png';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.state = {
      signedIn: false
    };
  }

  componentDidMount() {
    this.setState({signedIn: !!localStorage.getItem('token')})
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({signedIn: !!localStorage.getItem('token')})
    }
  }

  handleSignOut() {
    this.setState({signedIn: false});
    localStorage.removeItem('token');
    this.props.history.replace('/')
  }

  render() {
    const {signedIn} = this.state;

    return <div className="nav-bar">
      <div className="logo">
        <Link to='/'>
          <img src={logo} alt="logo" />
        </Link>
      </div>
        {signedIn && <div>
          <Link to='/' onClick={this.handleSignOut}><span className='logout-btn'>Logout</span></Link>
          <Link to='/my-messages'><span className='logout-btn'>My Messages</span></Link>
        </div>}
    </div>
  }

}
