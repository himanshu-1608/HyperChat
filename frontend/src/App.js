import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import './App.css';

import Login from './containers/Login/Login';
import Dashboard from './containers/Dashboard/Dashboard';

class App extends Component{

	state = {
		isLoggedIn: false,
		token: '',
		friends: [],
		subscribedChannels: []
	}

	componentDidMount(){
		const isLoggedIn = localStorage.getItem('isLoggedIn');
		const token = localStorage.getItem('token');
		if(isLoggedIn)	this.setState({isLoggedIn: true, token: token});
	}

	setLogin = (token) => {
		localStorage.setItem('isLoggedIn', true);
		localStorage.setItem('token', token);
		this.setState({isLoggedIn: true, token: token})
	}

	handleLogOut = () => {
		localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
		this.setState({isLoggedIn: false, token: ''});
	}

	render(){
		const { isLoggedIn, token, friends, subscribedChannels } = this.state;
		return(
			<div className="app-box">
				<Router>
					{ !isLoggedIn ? <Route 
										path='/' 
										component={() => <Login 
											setLogin={(token) => this.setLogin(token)} />} />
										: null}
					{ isLoggedIn ? <Route 
										path='/' 
										component={() => <Dashboard 
											friends={friends}
											subscribedChannels={subscribedChannels}
											token={token} />}
										/> : null}
				</Router>
			</div>
		)
	}
}

export default App;
