import React, { Component } from 'react';
import MenuBar from '../../components/MenuBar';
import NavBar from '../../components/NavBar';
import styles from './Dashboard.module.css';
import ChatSection from '../../components/ChatSection'
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';

class Dashboard extends Component{

    componentDidMount(){
        // const socket = openSocket('http://localhost:8080');
    }

    componentWillReceiveProps(newProps) {
        // console.log('NewProps', newProps);
        if (!newProps.isAuth) {
          this.props.history.push('/login');
        }
    }

    render(){
        const { subscribedChannels, friends, channelOpened, dmOpened } = this.props;
        return(
            <div className={styles.dashboard_page}>
                <MenuBar />
                <div className={styles.main_box}>
                    <NavBar 
                        subscribedChannels={subscribedChannels} 
                        friends={friends}
                        channelOpened={channelOpened}
                        dmOpened={dmOpened}/>
                    <ChatSection />
                </div>
                <button onClick={this.props.setLogout}>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
	return{
        friends: state.user.friends,
        subscribedChannels: state.user.subscribedChannels
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