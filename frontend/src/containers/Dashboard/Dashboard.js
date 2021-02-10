
import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/index';
import classes from './Dashboard.module.css';

class Dashboard extends Component{

    state={
        message: '',
        friends: [],
        subscribedChannels: []
    }

    componentDidMount(){
        const socket = openSocket('http://localhost:8080');
    }

    inputChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    sendMessageHandler = () => {
        
    }

    render(){
        const subscribedChannelList = this.state.subscribedChannels.map(channel => {
            return <div id={channel._id}>{channel.channelName}</div>
        });

        const friendList = this.state.friends.map(friend => {
            return <div id={friend._id}>{friend.userName}</div>
        })

        return(
            <div className={classes.RootContainer}>
                <div className={classes.Sidebar}>
                    <button onClick={this.props.setLogout}>Logout</button>
                    <div>HyperChat</div>
                    <div>
                        <h1>Channel List</h1>
                        {subscribedChannelList}
                    </div>
                    <div>
                        <h1>Friend List</h1>
                        {friendList}
                    </div>
                </div>
                <div className={classes.ChatPanel}>
                    Chat
                    <input 
                        type='text'
                        placeholder='type something'
                        name='message'
                        value={this.state.message}/>
                    <button>Send</button>
                </div>
                <div >
                    <div>All Channels</div>
                    <div>All users</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
	return{
        user: state.auth.user,
        token: state.auth.token
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setLogout: () => dispatch(actionCreators.setLogout())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);