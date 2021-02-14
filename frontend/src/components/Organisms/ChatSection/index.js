import { Component } from 'react';
import styles from './ChatSection.module.css';
import { AiOutlineSend } from 'react-icons/ai';
import Message from '../../Atom/Message';
import { MdPersonOutline } from 'react-icons/md';
import { RiUserAddLine } from 'react-icons/ri';
import { getSocket } from '../../../socket';

import { sendMessageInDm, sendMessageInChannel } from '../../../utils/message';

class ChatSection extends Component {
    state = {
        message: ''
    };

    setTypingEvents = () => {
        const { openChannel, openDm, user } = this.props;
        let receiverID, isChannel;
        if(openDm){
            receiverID = openDm._id;
            isChannel = false;
        }
        else if(openChannel){
            receiverID = openChannel._id;
            isChannel = true;
        }
            
        const socket = getSocket();
        if(socket && socket.connected){
            socket.emit('TYPING', {
                receiverID: receiverID,
                senderID: user._id,
                isChannel: isChannel,
                senderName: user.userName
            });
        }
    }

    unsetTypingEvents = () => {
        const { openChannel, openDm, user } = this.props;
        let receiverID, isChannel;
        if(openDm){
            receiverID = openDm._id;
            isChannel = false;
        }
        else if(openChannel){
            receiverID = openChannel._id;
            isChannel = true;
        }

        const socket = getSocket();
        if(socket && socket.connected){
            socket.emit('STOP_TYPING', {
                receiverID: receiverID,
                senderID: user._id,
                isChannel: isChannel
            });
        }
    }

    inputChangeHandler = (e) => {
        this.setState({ message: e.target.value });
        this.setTypingEvents();
    };

    onBlurHandler = () => {
        this.unsetTypingEvents();
    }

    isMessageValid = () => {
        const { message } = this.state;
        return message.trim().length;
    };
    componentDidMount(){
        const chat_box = document.getElementsByClassName(`${styles.chat_box}`)[0];
        chat_box.scrollTop = chat_box.scrollHeight;
    }

    sendMessageHandler = () => {
        if (!this.isMessageValid()) return;
        this.setState({ message: '' });
        const { openChannel, openDm, user } = this.props;
        if (openDm) {
            const message = {
                messageType: 'text',
                messagePayload: this.state.message,
                receiverID: openDm._id,
                sentTime: new Date(),
            };
            sendMessageInDm(user._id, message, this.props.addMessageInDm);
        }
        else if(openChannel){
            const message = {
                messageType: 'text',
                messagePayload: this.state.message,
                sentTime: new Date()
            }
            sendMessageInChannel(openChannel._id, message);
        }
    };

    render() {
        const {
            user,
            openChannel,
            openDm,
            directMessages,
            channelMessages,
            showSubscribersModal,
            showEditMessageModal,
            showDeleteMessageModal,
            showLastSeenModal
        } = this.props;
    
        let messageList;
        if (openChannel) {
            messageList = channelMessages.map((message) => {
                return (
                    <Message
                        key={message._id}
                        user={user}
                        message={message}
                        showEditMessageModal={showEditMessageModal}
                        showDeleteMessageModal={showDeleteMessageModal}
                        showLastSeenModal={showLastSeenModal}

                    />
                );
            });
        } else if (openDm) {
            messageList = directMessages.map((message) => {
                return (
                    <Message
                        key={message._id}
                        user={user}
                        message={message}
                        showEditMessageModal={showEditMessageModal}
                        showDeleteMessageModal={showDeleteMessageModal}
                        showLastSeenModal={showLastSeenModal}
                    />
                );
            });
        }

        return (
            <div className={styles.chat_section}>
                <div className={styles.chat_title}>
                    <div className={styles.chat_details}>
                        <div className={styles.chat_name}>
                            {openChannel
                                ? `#${openChannel.channelName}`
                                : `${openDm.userName}`}
                        </div>
                        <div className={styles.chat_desc}>
                            {openChannel ? (
                                <>
                                    <MdPersonOutline
                                        className={styles.icon_person}
                                        onClick={showSubscribersModal}
                                    />{' '}
                                    {openChannel.channelSubscribers.length}
                                    <span className={styles.divider}> | </span>
                                    {openChannel.channelDesc}
                                </>
                            ) : (  openDm ? (
                                    <div className={styles.user_status}>
                                        {openDm.isTyping ? 'Typing...' : `${openDm.lastSeen}`}
                                    </div>
                                ) : null    
                            )}
                        </div>
                        {/* TODO: Rahul apply style on it  */}
                        <div>
                            {openChannel && openChannel.isTyping ? `${openChannel.typingInfo.userName} is typing...` : null}
                        </div>
                    </div>
                    <div className={styles.chat_options}>
                        <div className={styles.options}>
                            {openChannel ? <RiUserAddLine /> : null}
                        </div>
                    </div>
                </div>
                <div className={styles.chat_box}>{messageList}</div>
                <div className={styles.chat_send_message}>
                    <div className={styles.send_message_box}>
                        <div className={styles.input_box}>
                            <input
                                placeholder={
                                    openChannel
                                        ? `Message #${openChannel.channelName}`
                                        : `Message ${openDm.userName}`
                                }
                                name="message"
                                value={this.state.message}
                                onChange={this.inputChangeHandler}
                                onBlur={this.onBlurHandler}
                            />
                        </div>
                        <div className={styles.send_icon}>
                            <AiOutlineSend
                                className={styles.icon}
                                onClick={this.sendMessageHandler}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ChatSection;
