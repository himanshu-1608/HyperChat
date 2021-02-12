import { Component } from 'react';
import styles from './Message.module.css';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiOutlineDotsVertical } from 'react-icons/hi';

class Message extends Component {
    render() {
        const { senderID, messagePayload, sentTime } = this.props.message;
        const { showEditMessageModal, showDeleteMessageModal } = this.props;
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
                        <div className={styles.time}>{sentTime}</div>
                    </div>
                    <div className={styles.message}>{messagePayload}</div>
                </div>
                <div className={styles.message_options}>
                    {/* TODO: edit option */}
                    <div className={styles.option} onClick={() => showEditMessageModal(this.props.message)}>
                        <BiEdit />
                    </div>
                    {/* TODO: delete option */}
                    <div className={styles.option} onClick={() => showDeleteMessageModal(this.props.message)}>
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
