import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import './App.css';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

class App extends Component{

	state = {
		isLoggedIn: false,
		token: '',
		currentUserId: '',
		friends: [],
		subscribedChannels: []
	}

	componentDidMount(){
		const isLoggedIn = localStorage.getItem('isLoggedIn');
		const token = localStorage.getItem('token');
		const currentUserId = localStorage.getItem('currentUserId')
		console.log(isLoggedIn, token, currentUserId);
		if(isLoggedIn)	this.setState({isLoggedIn: true, token: token, currentUserId: currentUserId});
	}

	setLogin = (token, currentUserId) => {
		localStorage.setItem('isLoggedIn', true);
		localStorage.setItem('token', token);
		localStorage.setItem('currentUserId', currentUserId);
		this.setState({isLoggedIn: true, token: token, currentUserId: currentUserId})
	}

	handleLogOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('currentUserId');
		this.setState({isLoggedIn: false, token: '', currentUserId: ''});
	}

	updateFriendsAndSubscribedChannels = (friends, subscribedChannels) => {
		console.log('this is called');
		this.setState({friends: friends, subscribedChannels: subscribedChannels})
	}

	render(){
		const { isLoggedIn, token, currentUserId, friends, subscribedChannels } = this.state;
		return(
			<Router>
				<button onClick={this.handleLogOut}>Logout</button>
				{ !isLoggedIn ? <Route 
									path='/' 
									component={() => <Login 
										setLogin={(token, currentUserId) => this.setLogin(token, currentUserId)} />} />
									 : null}
				{ isLoggedIn ? <Route 
									path='/' 
									component={() => <Dashboard 
										friends={friends}
										subscribedChannels={subscribedChannels}
										token={token}
										currentUserId={currentUserId}
										updateFriendsAndSubscribedChannels={(friends, channels) => this.updateFriendsAndSubscribedChannels(friends, channels)} />}
									 /> : null}
			</Router>
		)
	}
}

export default App;
