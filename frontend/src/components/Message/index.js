import { Component } from 'react';
import styles from './Message.module.css';

class Message extends Component {
    render() {
        return (
            <div className={styles.message_box}>
                <div className={styles.user_image}></div>
                <div className={styles.message_section}>
                    <div className={styles.message_info}>
                        <div className={styles.user_name}>
                            Rahul Yadav
                        </div>
                        <div className={styles.time}>
                            9:33 PM
                        </div>
                    </div>
                    <div className={styles.message}>
                        Loremadlfskj skfjasl lksjdf !!!
                    </div>
                </div>
            </div>
        );
    }
}
export default Message;
