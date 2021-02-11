import { Component } from 'react';
import styles from './Message.module.css';

class Message extends Component {
    render() {
        const { senderID, messagePayload, sentTime } = this.props.message;
        return (
            <div className={styles.message_box}>
                {/* TODO: Rahul remove background and add img tag and necessary styling */}
                <div className={styles.user_image}></div>
                <div className={styles.message_section}>
                    <div className={styles.message_info}>
                        <div className={styles.user_name}>
                            {senderID.userName}
                        </div>
                        <div className={styles.time}>
                            {/* TODO: Change the format of time  */}
                            {sentTime}
                        </div>
                    </div>
                    <div className={styles.message}>
                        {messagePayload}
                    </div>
                </div>
            </div>
        );
    }
}
export default Message;
