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
import DeleteMessageModal from '../../components/DeleteMessageModal';

class Dashboard extends Component {
    state = {
        showSubscribersModal: false,
        showEditMessageModal: false,
        showDeleteMessageModal: false,
        editMessage: {},
        deleteMessage: {}
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
            showSubscribersModal: !this.state.showSubscribersModal,
        });
    };

    editMessageModalToggleHandler = (editMessage = {}) => {
        this.setState({
            showEditMessageModal: !this.state.showEditMessageModal,
            editMessage: editMessage,
        });
    };

    deleteMessageModalToggleHandler = (deleteMessage = {}) => {
        this.setState({
            showDeleteMessageModal: !this.state.showDeleteMessageModal,
            deleteMessage: deleteMessage
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
            addMessageInChannel,
            addMessageInDm,
            editMessageInChannel,
            editMessageInDm,
            deleteMessageInChannel,
            deleteMessageInDm
        } = this.props;
        const {
            showSubscribersModal,
            showEditMessageModal,
            showDeleteMessageModal,
            editMessage,
            deleteMessage } = this.state;
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
                                            addMessageInChannel={addMessageInChannel}
                                            addMessageInDm={addMessageInDm}
                                            showSubscribersModal={this.subscribersModalToggleHandler}
                                            showEditMessageModal={this.editMessageModalToggleHandler}
                                            showDeleteMessageModal={this.deleteMessageModalToggleHandler}
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
                            hideModal={this.subscribersModalToggleHandler}
                        />
                    </div>
                ) : null}
                {showEditMessageModal ? (
                    <div className={styles.modals}>
                        <EditMessageModal
                            hideModal={this.editMessageModalToggleHandler}
                            editMessage={editMessage}
                            user={user}
                            openChannel={openChannel}
                            openDm={openDm}
                            editMessageInChannel={editMessageInChannel}
                            editMessageInDm={editMessageInDm}
                        />
                    </div>
                ) : null}
                {showDeleteMessageModal ? (
                    <div className={styles.modals}>
                        <DeleteMessageModal 
                            hideModal={this.deleteMessageModalToggleHandler} 
                            deleteMessage={deleteMessage}
                            user={user}
                            openChannel={openChannel}
                            openDm={openDm}
                            deleteMessageInChannel={deleteMessageInChannel}
                            deleteMessageInDm={deleteMessageInDm} />
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
        channelOpened: (channel) => dispatch(actionCreators.channelOpened(channel)),
        dmOpened: (dm) => dispatch(actionCreators.dmOpened(dm)),
        addMessageInChannel: (message) => dispatch(actionCreators.addMessageInChannel(message)),
        addMessageInDm: (message) => dispatch(actionCreators.addMessageInDm(message)),
        editMessageInChannel: (message) => dispatch(actionCreators.editMessageInChannel(message)),
        editMessageInDm: (message) => dispatch(actionCreators.editMessageInDm(message)),
        deleteMessageInChannel: (message) => dispatch(actionCreators.deleteMessageInChannel(message)),
        deleteMessageInDm: (message) => dispatch(actionCreators.deleteMessageInDm(message))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
