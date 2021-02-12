import { Route, Switch, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import * as actionCreators from './actions/index';

import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import Dashboard from './containers/Dashboard/Dashboard';

const io = require('socket.io-client');

class App extends Component{

	componentDidMount(){
		const token = localStorage.getItem('token');
		const user = JSON.parse(localStorage.getItem('user'));
		if( token && user ){
		  this.props.setLogin(user, token);
		  this.props.fetchFriendsAndChannels(user._id);
		  this.props.history.push('/');
		}
		else this.props.history.push('/login');
		const socket = io('http://localhost:8080/');
        socket.on('connect', ()=> {
            console.log('socket-id: ', socket.id);
            socket.emit('USER_JOINED', user._id);
            socket.on('DIRECT_MESSAGE', message => {
				console.log("DIRECT_MESSAGE came at room: ", user._id, message);
            });
        });	
	}

	componentWillReceiveProps(newProps){
		if(!this.props.isAuth && newProps.isAuth){
			this.props.fetchFriendsAndChannels(newProps.user._id);
		}		
	}

	handleLogOut = () => {
		this.props.setLogout();
		this.props.history.push('/login');
	}

	render(){
		const { isAuth } = this.props;
		return(
			<div className="app-box">
				<Switch>
					<Route exact path='/login' component={Login}/>
					<Route exact path='/signup' component={Signup}/>
					<Route path='/' component={Dashboard} /> 
				</Switch>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		isAuth: state.auth.isAuth,
		user: state.auth.user
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setLogin: (user, token) => dispatch(actionCreators.setLogin(user, token)),
		setLogout: () => dispatch(actionCreators.setLogout()),
		fetchFriendsAndChannels: (userId) => dispatch(actionCreators.fetchFriendsAndChannels(userId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

