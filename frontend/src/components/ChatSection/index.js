import { Component } from 'react';
import styles from './ChatSection.module.css';
import { AiOutlineSend } from 'react-icons/ai';
import Message from '../Message';
import { MdPersonOutline } from 'react-icons/md';
import { RiUserAddLine } from 'react-icons/ri';

import axios from '../../axios';

class ChatSection extends Component {
    
    state = {
        message: ''
    }

    inputChangeHandler = (e) => {
        this.setState({message: e.target.value})
    }

    isMessageValid = () => {
        const { message } = this.state;
        return message.trim().length;
    }

    sendMessageHandler = () => {
        if(!this.isMessageValid())
            return;

        this.setState({message: ''});    
        const { openChannel, openDm, user } = this.props;
        if(openDm){
            axios.post(`/users/${user._id}/dm/message`, {
                messageType: 'text',
                messagePayload: this.state.message,
                receiverID: openDm._id,
                sentTime: new Date()
            })
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
        }
        else if(openChannel){
            axios.post(`/${openChannel._id}/dm/message`, {
                messageType: 'text',
                messagePayload: this.state.message,
                sentTime: new Date()
            })
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
        }
    }

    render() {
        const { openChannel, openDm, directMessages, channelMessages } = this.props;
        let messageList;
        if(openChannel){
            messageList = channelMessages.map(message => {
                return <Message key={message._id} message={message}/>
            })
        }
        else if(openDm){
            messageList = directMessages.map(message => {
                return <Message key={message._id} message={message}/>
            })
        }

        return (
            <div className={styles.chat_section}>
                <div className={styles.chat_title}>
                    <div className={styles.chat_details}>
                        <div className={styles.chat_name}>
                            {openChannel ? `#${openChannel.channelName}` : `${openDm.userName}`}
                        </div>
                        <div className={styles.chat_desc}>

                            {/* TODO: clicking on this icon(MDPersonOutline) will show the SubscribersModal */}
                            {openChannel ? (
                                <>
                                    <MdPersonOutline className={styles.icon_person}/>{' '}
                                    {openChannel.channelSubscribers.length}<span className={styles.divider}> | </span>
                                    {openChannel.channelDesc}
                                </>
                            ) : null}
                        </div>
                    </div>
                    <div className={styles.chat_options}>
                        <div className={styles.options}>
                            <RiUserAddLine />
                        </div>
                    </div>
                </div>
                <div className={styles.chat_box}>
                    {/* TODO: all messages will be shown here    */}
                    {messageList}
                </div>
                <div className={styles.chat_send_message}>
                    <div className={styles.send_message_box}>
                        <div className={styles.input_box}>
                            {/* TODO: change the placeholder as per channel name */}
                            <input 
                                placeholder={openChannel ? `Message #${openChannel.channelName}` : `Message ${openDm.userName}`}
                                name='message'
                                value={this.state.message}
                                onChange={this.inputChangeHandler} />
                        </div>
                        <div className={styles.send_icon}>
                            <AiOutlineSend className={styles.icon} onClick={this.sendMessageHandler} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ChatSection;
