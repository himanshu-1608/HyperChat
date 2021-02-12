import { Component } from 'react';
import styles from './Message.module.css';

class Message extends Component {
    render() {
        const { senderID, messagePayload, sentTime } = this.props.message;
        return (
            <div className={styles.message_box}>
                <div className={styles.user_image}>
                    <img src={senderID.userProfilePicURL} alt="User"/>
                </div>
                <div className={styles.message_section}>
                    <div className={styles.message_info}>
                        <div className={styles.user_name}>
                            {senderID.userName}
                        </div>
                        <div className={styles.time}>
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
