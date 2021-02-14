import React, { Component } from 'react';
import MenuBar from '../../components/Organisms/MenuBar';
import NavBar from '../../components/Organisms/NavBar';
import styles from './Dashboard.module.css';
import ChatSection from '../../components/Organisms/ChatSection';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import BrowseChannels from '../BrowseChannels';
import BrowseDms from '../BrowseDMs';
import EmptySection from '../../components/Organisms/EmptySection';
import SubscribersModal from '../../components/Modals/SubscribersModal';
import EditMessageModal from '../../components/Modals/EditMessageModal';
import DeleteMessageModal from '../../components/Modals/DeleteMessageModal';
import CreateChannelModal from '../../components/Modals/CreateChannelModal';
import LastSeenModal from '../../components/Modals/LastSeenModal';

class Dashboard extends Component {
    state = {
        showSubscribersModal: false,
        showEditMessageModal: false,
        showDeleteMessageModal: false,
        showCreateChannelModal: false,
        showLastSeenModal: false,
        editMessage: {},
        deleteMessage: {}
    };

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
    };

    createChannelModalToggleHandler = () => {
        this.setState({
            showCreateChannelModal: !this.state.showCreateChannelModal,
        });
    };

    lastSeenModalToggleHandler = () => {
        this.setState({
            showLastSeenModal: !this.state.showLastSeenModal,
        });
    };

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
            addMessageInDm,
            editMessageInDm,
            deleteMessageInDm,
            createChannel
        } = this.props;
        const {
            showSubscribersModal,
            showEditMessageModal,
            showDeleteMessageModal,
            showCreateChannelModal,
            showLastSeenModal,
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
                                path="/browse-channels"
                                exact
                                component={() => <BrowseChannels showCreateChannelModal={this.createChannelModalToggleHandler}/>}
                            />
                            <Route
                                path="/browse-dms"
                                exact
                                component={() => <BrowseDms />}
                            />
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
                                            addMessageInDm={addMessageInDm}
                                            showSubscribersModal={this.subscribersModalToggleHandler}
                                            showEditMessageModal={this.editMessageModalToggleHandler}
                                            showDeleteMessageModal={this.deleteMessageModalToggleHandler}
                                            showLastSeenModal={this.lastSeenModalToggleHandler}
                                        />
                                    ) : (
                                        <EmptySection />
                                    )
                                }
                            />
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </Router>
                {showSubscribersModal ? (
                    <div className={styles.modals}>
                        <SubscribersModal
                            hideModal={this.subscribersModalToggleHandler}
                            channel={openChannel}
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
                            deleteMessageInDm={deleteMessageInDm} />
                    </div>
                ) : null}  
                {showCreateChannelModal ? (
                    <div className={styles.modals}>
                        <CreateChannelModal
                            hideModal={this.createChannelModalToggleHandler}
                            createChannel={createChannel}
                        />
                    </div>
                ) : null}
                {showLastSeenModal ? (
                    <div className={styles.modals}>
                        <LastSeenModal
                            hideModal={this.lastSeenModalToggleHandler}
                        />
                    </div>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        user: state.auth.user,
        friends: state.user.friends,
        subscribedChannels: state.user.subscribedChannels,
        openChannel: state.user.openChannel,
        openDm: state.user.openDm,
        directMessages: state.user.directMessages,
        channelMessages: state.user.channelMessages
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLogout: () => dispatch(actionCreators.setLogout()),
        channelOpened: channel => dispatch(actionCreators.channelOpened(channel)),
        dmOpened: dm => dispatch(actionCreators.dmOpened(dm)),
        addMessageInDm: message => dispatch(actionCreators.addMessageInDm(message)),
        editMessageInDm: message => dispatch(actionCreators.editMessageInDm(message)),
        deleteMessageInDm: message => dispatch(actionCreators.deleteMessageInDm(message)),
        createChannel: (channel, hideModal) => dispatch(actionCreators.createChannel(channel, hideModal))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
