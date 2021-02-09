
import React, { Component } from 'react';
import openSocket from 'socket.io-client';

import classes from './Dashboard.module.css';

class Dashboard extends Component{

    state={
        allUsers: [],
        allChannels: [],
        message: ''
    }

    componentDidMount(){
        fetch('http://localhost:8080/user/getAllUsers', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        })
        .then(result => result.json())
        .then(result => {
            console.log(result);
            this.setState({allUsers: result.users});
        })
        .catch(err => console.log(err));

        fetch('http://localhost:8080/channel/getAllChannels', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        })
        .then(result => result.json())
        .then(result => {
            console.log(result);
            this.setState({allChannels: result.channels});
        })
        .catch(err => console.log(err));

        const socket = openSocket('http://localhost:8080');
    }

    inputChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    sendMessageHandler = () => {
        
    }

    render(){

        const subscribedChannelList = this.props.subscribedChannels.map(channel => {
            return <div id={channel._id}>{channel.channelName}</div>
        });

        const friendList = this.props.friends.map(friend => {
            return <div id={friend._id}>{friend.userName}</div>
        })

        return(
            <div className={classes.RootContainer}>
                <div className={classes.Sidebar}>
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

export default Dashboard;