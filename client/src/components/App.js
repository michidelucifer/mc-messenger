import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthRoute, ProtectedRoute } from '../util/advancedRoute';

import '../style/App.css';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Profile from './Profile';
import ChatRoom from './ChatRoom';
import Chat from './Chat';
// import NotFound from './NotFound';

const mapStateToProps = state => ({
	isLoggedIn: Boolean(state.sessionReducer.username)
})

class App extends Component {
	
	navigationBarRender() {
		if (this.props.isLoggedIn) {
			return (
				<ul>
					<li><Link to='/chatroom'>Chat Room</Link></li>
					<li><Link to='/profile'>Profile</Link></li>
					<li><Link to='/signout'>Sign Out</Link></li>
				</ul>
			)
		} else {
			return (
				<ul>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/signin'>Sign In</Link></li>
					<li><Link to='/signup'>Sign Up</Link></li>
				</ul>
			)
		}
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<header className="App-header">
						<nav>{this.navigationBarRender()}</nav>
					</header>
					<main>
						<Route exact path='/' component={Home} />
						<ProtectedRoute path='/signin' component={SignIn} />
						<ProtectedRoute path='/signup' component={SignUp} />
						<AuthRoute path='/signout' component={SignOut} />
						<AuthRoute path='/profile' component={Profile} />
						<AuthRoute path='/chatroom' component={ChatRoom} />
						<AuthRoute path='/chat/:friendName' component={Chat} />
					</main>
					<footer>
						<p>mcMessenger - 2019</p>
					</footer>
				</div>
			</BrowserRouter>
		);
	}
}

export default connect(mapStateToProps)(App);
