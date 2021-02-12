import { Component } from 'react';
import styles from './Message.module.css';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiOutlineDotsVertical } from 'react-icons/hi';

class Message extends Component {
    render() {
        const { senderID, messagePayload, sentTime } = this.props.message;
        return (
            <div className={styles.message_box}>
                {/* TODO: image url should be added here */}
                <div className={styles.user_image}>
                    <img src="" alt="User" />
                </div>
                <div className={styles.message_section}>
                    <div className={styles.message_info}>
                        <div className={styles.user_name}>
                            {senderID.userName}
                        </div>
                        <div className={styles.time}>{sentTime}</div>
                    </div>
                    <div className={styles.message}>{messagePayload}</div>
                </div>
                <div className={styles.message_options}>
                    {/* TODO: edit option */}
                    <div className={styles.option}>
                        <BiEdit />
                    </div>
                    {/* TODO: delete option */}
                    <div className={styles.option}>
                        <AiOutlineDelete />
                    </div>
                    <div className={styles.option}>
                        <HiOutlineDotsVertical />
                    </div>
                </div>
            </div>
        );
    }
}
export default Message;
