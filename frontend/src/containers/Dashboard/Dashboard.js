import React, { Component } from 'react';
import MenuBar from '../../components/MenuBar';
import NavBar from '../../components/NavBar';
import styles from './Dashboard.module.css';
import ChatSection from '../../components/ChatSection';
import SubscribersModal from '../../components/SubscribersModal/index';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';

class Dashboard extends Component{

    state = {
        showSubscribersModal: false
    }

    componentDidMount(){
        // const socket = openSocket('http://localhost:8080');
    }

    componentWillReceiveProps(newProps) {
        // console.log('NewProps', newProps);
        if (!newProps.isAuth) {
          this.props.history.push('/login');
        }
    }

    subscribersModalShowHandler = () => {
        this.setState({showSubscribersModal: true})
    };

    subscribersModalHideHandler = () => this.setState({showSubscribersModal: false});

    render(){
        const { user, subscribedChannels, friends, channelOpened, dmOpened, openChannel, openDm, directMessages, channelMessages } = this.props;
        const { showSubscribersModal } = this.state;
        return(
            <div className={styles.dashboard_page}>
                <MenuBar setLogout={this.props.setLogout}/>
                <div className={styles.main_box}>
                    <NavBar 
                        subscribedChannels={subscribedChannels} 
                        friends={friends}
                        channelOpened={channelOpened}
                        dmOpened={dmOpened}/>
                    {(openChannel || openDm) ? (
                        <ChatSection 
                            user={user}
                            openChannel={openChannel}
                            openDm={openDm}
                            directMessages={directMessages}
                            channelMessages={channelMessages} />
                        ) : null   }
                    
                </div>
                
                {/* {showSubscribersModal ? (
                    <div className={styles.modals}>
                        <SubscribersModal onClick={this.subscribersModalShowHandler}/>
                    </div>
                ) : null}    */}
            </div>
        )
    }
}

const mapStateToProps = state => {
	return{
        user: state.auth.user,
        friends: state.user.friends,
        subscribedChannels: state.user.subscribedChannels,
        openChannel: state.user.openChannel,
        openDm: state.user.openDm,
        directMessages: state.user.directMessages,
        channelMessages: state.user.channelMessages
	}
}

const mapDispatchToProps = dispatch => {
	return {
        setLogout: () => dispatch(actionCreators.setLogout()),
        channelOpened: (channel) => dispatch(actionCreators.channelOpened(channel)),
        dmOpened: (dm) => dispatch(actionCreators.dmOpened(dm))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);