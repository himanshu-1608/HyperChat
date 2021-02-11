import { Component } from 'react';
import styles from './ChatSection.module.css';
import { AiOutlineSend } from 'react-icons/ai';
import Message from '../Message';
import { MdPersonOutline } from 'react-icons/md';
import { RiUserAddLine } from 'react-icons/ri';

class ChatSection extends Component {
    
    state = {
        message: ''
    }

    inputChangeHandler = (e) => {
        this.setState({message: e.target.value})
    }

    render() {
        return (
            <div className={styles.chat_section}>
                <div className={styles.chat_title}>
                    <div className={styles.chat_details}>
                        <div className={styles.chat_name}>#general</div>
                        <div className={styles.chat_desc}>

                            {/* TODO: clicking on this icon(MDPersonOutline) will show the SubscribersModal */}
                            <MdPersonOutline className={styles.icon_person} />{' '}
                            20<span className={styles.divider}> | </span>
                            Add a topic
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
                    <Message />
                    <Message />
                    <Message />
                </div>
                <div className={styles.chat_send_message}>
                    <div className={styles.send_message_box}>
                        <div className={styles.input_box}>
                            {/* TODO: change the placeholder as per channel name */}
                            <input 
                                placeholder="Message #general"
                                name='message'
                                value={this.state.message}
                                onChange={this.inputChangeHandler} />
                        </div>
                        <div className={styles.send_icon}>
                            <AiOutlineSend className={styles.icon} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ChatSection;
