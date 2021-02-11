import React, { Component } from 'react';
import MenuBar from '../../components/MenuBar';
import NavBar from '../../components/NavBar';
import styles from './Dashboard.module.css';
import ChatSection from '../../components/ChatSection';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';
import SubscribersModal from '../../components/SubscribersModal';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BrowseChannels from '../BrowseChannels';
import BrowseDms from '../BrowseDMs';

class Dashboard extends Component {
    componentDidMount() {
        // const socket = openSocket('http://localhost:8080');
    }

    componentWillReceiveProps(newProps) {
        // console.log('NewProps', newProps);
        if (!newProps.isAuth) {
            this.props.history.push('/login');
        }
    }

    render() {
        const {
            subscribedChannels,
            friends,
            channelOpened,
            dmOpened,
        } = this.props;
        return (
            <div className={styles.dashboard_page}>
                <Router>
                    <MenuBar />
                    <div className={styles.main_box}>
                        <NavBar
                            subscribedChannels={subscribedChannels}
                            friends={friends}
                            channelOpened={channelOpened}
                            dmOpened={dmOpened}
                        />

                        <Switch>
                            <Route
                                path="/"
                                exact
                                component={() => <ChatSection />}
                            />
                            <Route
                                path="/browse-channels"
                                exact
                                component={() => <BrowseChannels />}
                            />
                            <Route
                                path="/browse-dms"
                                exact
                                component={() => <BrowseDms />}
                            />
                        </Switch>
                    </div>
                </Router>

                {/* TODO: add the modal useState here  */}
                {/* <div className={styles.modals}> */}
                {/* <SubscribersModal /> */}
                {/* </div> */}

                {/* TODO: Button has been relocated to MenuBar */}
                {/* <button onClick={this.props.setLogout}>Logout</button> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        friends: state.user.friends,
        subscribedChannels: state.user.subscribedChannels,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLogout: () => dispatch(actionCreators.setLogout()),
        channelOpened: (channel) =>
            dispatch(actionCreators.channelOpened(channel)),
        dmOpened: (dm) => dispatch(actionCreators.dmOpened(dm)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
