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
        {!signedIn && <Link to="/login"><span className='logout-btn'>Login ログイン</span></Link>}
        {signedIn && <div>
          <Link to='/' onClick={this.handleSignOut}><span className='logout-btn'>Logout</span></Link>
          <Link to={`/my-messages/${localStorage.getItem('user')}`}><span className='logout-btn'>My Messages</span></Link>
          {localStorage.getItem('user') === 'coach' && <Link to='/players-list'><span className='logout-btn'>Players</span></Link>}
          {localStorage.getItem('user') === 'player' && <Link to={`/player/${localStorage.getItem('id')}/edit`}><span className='logout-btn'>Edit Profile</span></Link>}
        </div>}
    </div>
  }

}
