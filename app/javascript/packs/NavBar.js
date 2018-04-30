import React from "react";
import { Link, Redirect } from "react-router-dom";
import logo from '../../assets/images/logo.png';

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
    const user = localStorage.getItem('user');
    const userId = localStorage.getItem('id');

    return <div className="nav-bar">
      <div className="logo">
        <Link to='/'>
          <img src={logo} alt="logo" />
        </Link>
      </div>
        {!signedIn && <Link to="/login"><span className='logout-btn'>Login ログイン</span></Link>}
        {signedIn && <div>
          <Link to='/' onClick={this.handleSignOut}><span className='logout-btn'>{user === 'coach' ? 'ログアウト' : 'Logout'}</span></Link>
          <Link to={`/my-messages/${user}`}><span className='logout-btn'>{user === 'coach' ? 'メッセージ' : 'My Messages'}</span></Link>
          {user === 'coach' && <Link to='/players-list'><span className='logout-btn'>{user === 'coach' ? '選手の情報' : 'Players'}</span></Link>}
          {user === 'player' && <Link to={`/player/${userId}/edit`}><span className='logout-btn'>Edit Profile</span></Link>}
        </div>}
    </div>
  }

}
