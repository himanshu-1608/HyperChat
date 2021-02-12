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
import EmptySection from '../../components/EmptySection';
import EditMessageModal from '../../components/EditMessageModal';

class Dashboard extends Component {
    state = {
        showSubscribersModal: false,
        showEditMessageModal: false,
        showDeleteMessageModal: false,
        editMessage: {}
    };

    componentDidMount() {
        // const socket = openSocket('http://localhost:8080');
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.isAuth) {
            this.props.history.push('/login');
        }
    }

    subscribersModalToggleHandler = () => {
        this.setState({
            showSubscribersModal: !this.state.showSubscribersModal
        })
    }

    editMessageModalToggleHandler = (editMessage = {}) => {
        this.setState({
            showEditMessageModal: !this.state.showEditMessageModal,
            editMessage: editMessage
        });
    }

    render() {
        const {
            user,
            subscribedChannels,
            friends,
            channelOpened,
            dmOpened,
            openChannel,
            openDm,
            directMessages,
            channelMessages,
        } = this.props;
        const { 
            showSubscribersModal, 
            showEditMessageModal, 
            showDeleteMessageModal,
            editMessage } = this.state;
        return (
            <div className={styles.dashboard_page}>
                <Router>
                    <MenuBar setLogout={this.props.setLogout} />
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
                                component={() =>
                                    openChannel || openDm ? (
                                        <ChatSection
                                            user={user}
                                            openChannel={openChannel}
                                            openDm={openDm}
                                            directMessages={directMessages}
                                            channelMessages={channelMessages}
                                            showSubscribersModal={this.subscribersModalToggleHandler}
                                            showEditMessageModal={this.editMessageModalToggleHandler}
                                        />
                                    ) : (
                                        <EmptySection />
                                    )
                                }
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
                {/* TODO: all modals will be display here do it here */}
                {showSubscribersModal ? (
                    <div className={styles.modals}>
                        <SubscribersModal 
                            hideModal={this.subscribersModalToggleHandler} />
                    </div>
                ) : null} 
                {showEditMessageModal ? (
                    <div className={styles.modals}>
                        <EditMessageModal 
                            hideModal={this.editMessageModalToggleHandler} 
                            editMessage={editMessage}
                            user={user}
                            openChannel={openChannel}
                            openDm={openDm}/>
                    </div>
                ) : null} 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        friends: state.user.friends,
        subscribedChannels: state.user.subscribedChannels,
        openChannel: state.user.openChannel,
        openDm: state.user.openDm,
        directMessages: state.user.directMessages,
        channelMessages: state.user.channelMessages,
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
