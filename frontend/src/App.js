import { Route, Switch, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import * as actionCreators from './actions/index';

import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import Dashboard from './containers/Dashboard/Dashboard';

import { init } from './socket';

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
	}

	componentWillReceiveProps(newProps){
		if(!this.props.isAuth && newProps.isAuth){
			this.props.fetchFriendsAndChannels(newProps.user._id);
			const { 
				addMessageInChannel,
				addMessageInDm, 
				editMessageInChannel,
				editMessageInDm, 
				deleteMessageInChannel,
				deleteMessageInDm,
				setTypingInDm,
				setTypingInChannel,
				unsetTypingInDm,
				unsetTypingInChannel } = this.props;
				
			init(addMessageInChannel,
				addMessageInDm, 
				editMessageInChannel,
				editMessageInDm, 
				deleteMessageInChannel,
				deleteMessageInDm,
				setTypingInDm,
				setTypingInChannel,
				unsetTypingInDm,
				unsetTypingInChannel);
		}		
	}

	handleLogOut = () => {
		this.props.setLogout();
		this.props.history.push('/login');
	}

	render(){
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
		fetchFriendsAndChannels: (userId) => dispatch(actionCreators.fetchFriendsAndChannels(userId)),
		addMessageInChannel: message => dispatch(actionCreators.addMessageInChannel(message)),
		addMessageInDm: message => dispatch(actionCreators.addMessageInDm(message)),
		editMessageInChannel: message => dispatch(actionCreators.editMessageInChannel(message)),
		editMessageInDm: message => dispatch(actionCreators.editMessageInDm(message)),
		deleteMessageInChannel: message => dispatch(actionCreators.deleteMessageInChannel(message)),
		deleteMessageInDm: message => dispatch(actionCreators.deleteMessageInDm(message)),
		setTypingInChannel: (channelId, typedBy) => dispatch(actionCreators.setTypingInOpenChannel(channelId, typedBy)),
		setTypingInDm: dmId => dispatch(actionCreators.setTypingInOpenDm(dmId)),
		unsetTypingInChannel: channelId => dispatch(actionCreators.unsetTypingInOpenChannel(channelId)),
		unsetTypingInDm: dmId => dispatch(actionCreators.unsetTypingInOpenDm(dmId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

