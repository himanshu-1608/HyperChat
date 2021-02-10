import { Component } from 'react';
import styles from './ChatSection.module.css';
import { AiOutlineSend } from 'react-icons/ai';
import Message from '../Message';


class ChatSection extends Component {
    render() {
        return (
            <div className={styles.chat_section}>
                <div className={styles.chat_title}></div>
                <div className={styles.chat_box}>
                    {/* TODO: message box   */}
                    <Message />
                    <Message />
                    <Message />
                </div>
                <div className={styles.chat_send_message}>
                    <div className={styles.send_message_box}>
                        <div className={styles.input_box}>
                            {/* TODO: change the placeholder as per channel name */}
                            <input placeholder="Message #general" />
                        </div>
                        <div className={styles.send_icon}>
                            <AiOutlineSend className={styles.icon}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ChatSection;
