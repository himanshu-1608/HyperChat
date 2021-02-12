import { Component } from 'react';
import styles from './Message.module.css';
import { BiEdit, BiShow } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import moment from 'moment';

class Message extends Component {
    render() {
        const { senderID, messagePayload, sentTime } = this.props.message;
        const { showEditMessageModal } = this.props;
        return (
            <div className={styles.message_box}>
                <div className={styles.user_image}>
                    <img src={senderID.userProfilePicURL} alt="User" />
                </div>
                <div className={styles.message_section}>
                    <div className={styles.message_info}>
                        <div className={styles.user_name}>
                            {senderID.userName}
                        </div>
                        <div className={styles.time}>
                            {moment(sentTime).format('LT')}
                        </div>
                    </div>
                    <div className={styles.message}>
                        {messagePayload}
                        {/* TODO: show message is edited or not */}
                        <div className={styles.message_edited}>(edited)</div>
                    </div>
                </div>
                <div className={styles.message_options}>
                    <div
                        className={styles.option}
                        onClick={() => showEditMessageModal(this.props.message)}
                    >
                        <BiEdit />
                    </div>
                    {/* TODO: delete option */}
                    <div className={styles.option}>
                        <AiOutlineDelete />
                    </div>
                    {/* TODO: last seen option */}
                    <div className={styles.option}>
                        <BiShow />
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
