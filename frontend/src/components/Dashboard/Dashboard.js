
import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { init, getSocket } from '../../socket';

import classes from './Dashboard.module.css';

class Dashboard extends Component{

    state = {
        allUsers: [],
        allChannels: [],
        message: '',
        visitingFriendId: '',
        visitingChannelId: '',
        showMessages: [],
        showTyping: false
    }

    componentDidMount(){
        console.log('cdm', this.props);
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

        // if(this.props.friends.length)

        fetch('http://localhost:8080/user/getUserFriendsAndChannels', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        })
        .then(result => result.json())
        .then(result => {
            console.log(result);
            if(this.props.friends.length !== result.userFriends.length || this.props.subscribedChannels.length !== result.userSubscribedChannels.length)
                this.props.updateFriendsAndSubscribedChannels(result.userFriends, result.userSubscribedChannels);
        })
        .catch(err => console.log(err));

        init();
        const socket = getSocket();
        socket.emit('USER_JOINED', {
            channelIds: this.state.allChannels,
            userId: this.props.currentUserId
        });

        socket.on('DIRECT_MESSAGE', data => {
            console.log('Direct message called: ', data);
            const senderId = data.message.senderID;
            console.log(senderId, this.state.visitingFriendId);
            console.log(senderId, this.props.currentUserId);
            if(senderId == this.state.visitingFriendId || senderId == this.props.currentUserId){
                console.log('yes');
                const updatedShowMessages = [...this.state.showMessages];
                updatedShowMessages.push(data.message);
                this.setState({showMessages: updatedShowMessages}, ()=> {
                    console.log('state changed: ', this.state.showMessages);
                });
            }
        });

        socket.on('TYPING_DM', data => {
            console.log('typing dm:', data);
            console.log(data.receiverID, this.props.currentUserId);
            console.log(data.senderID, this.state.visitingFriendId);
            if(data.receiverID == this.props.currentUserId && data.senderID == this.state.visitingFriendId)
                this.setState({showTyping: true}, () => console.log(this.state.showTyping));
        });

        socket.on('STOP_TYPING_DM', data => {
            console.log('stop typing dm:', data);
            if(data.receiverID == this.props.currentUserId && data.senderID == this.state.visitingFriendId)
                this.setState({showTyping: false}, () => console.log(this.state.showTyping));
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

        // socket.disconnect();
    }

    inputChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
        const socket = getSocket();
        socket.emit('TYPING', {
            senderID: this.props.currentUserId,
            friendID: this.state.visitingFriendId,
            channelID: this.state.visitingChannelId
        });
    }

    onBlurHandler = () => {
        const socket = getSocket();
        socket.emit('STOP_TYPING', {
            senderID: this.props.currentUserId,
            friendID: this.state.visitingFriendId,
            channelID: this.state.visitingChannelId
        });
    }

    sendMessageHandler = () => {
        this.setState({message: ''});
        let recieverID;
        if(this.state.visitingFriendId != '')
            recieverID = this.state.visitingFriendId;
        else if(this.state.visitingChannelId != '')
            recieverID = this.state.visitingChannelId;
        fetch('http://localhost:8080/message/sendMessage', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messageType: 'text',
                messagePayload: this.state.message,
                isChannelMessage: false,
                recieverID: recieverID,
                sentTime: new Date()
            })
        })
        .then(result => result.json())
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    }

    clickFriendHandler = (friendID) => {
        this.setState({visitingFriendId: friendID, visitingChannelId: ''});
        fetch('http://localhost:8080/message/getMessages/' + friendID, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        })
        .then(result => result.json())
        .then(result => {
            this.setState({showMessages: result.messages});
            console.log(result);
        })
        .catch(err => console.log(err));
    }

    render(){
        console.log('Showtyping is:', this.state.showTyping);
        // console.log('show messages are: ', this.state.showMessages);
        const subscribedChannelList = this.props.subscribedChannels.map(channel => {
            return <div key={channel._id}>{channel.channelName}</div>
        });

        const friendList = this.props.friends.map(friend => {
            // console.log('friend: ', friend);
            return <div 
                key={friend._id} 
                onClick={() => this.clickFriendHandler(friend._id)}>{friend.userName}</div>
        })

        const messageList = this.state.showMessages.map(message => {
            return <div key={message._id}>{message.messagePayload}</div>
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
                        value={this.state.message}
                        onChange={this.inputChangeHandler}
                        onBlur={this.onBlurHandler}/>
                    <button onClick={this.sendMessageHandler}>Send</button>
                    {messageList}
                </div>
                {this.state.showTyping ? <div>Typing....</div> : null};
                <div >
                    <div>All Channels</div>
                    <div>All users</div>
                </div>
            </div>
        )
    }
}

export default Dashboard;