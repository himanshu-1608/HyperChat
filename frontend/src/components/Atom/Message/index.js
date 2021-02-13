import { Component } from 'react';
import styles from './Message.module.css';
import { BiEdit, BiShow } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import moment from 'moment';

class Message extends Component {
    render() {
        const {
            senderID,
            messagePayload,
            sentTime,
            isEdited,
            isDeleted,
        } = this.props.message;
        const {
            user,
            showEditMessageModal,
            showDeleteMessageModal,
            showLastSeenModal,
        } = this.props;
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
                        {isDeleted ? (
                            <div className={styles.deleted_message}>
                                This message was deleted
                            </div>
                        ) : (
                            `${messagePayload}`
                        )}
                        {!isDeleted && isEdited ? (
                            <div className={styles.message_edited}>
                                (edited)
                            </div>
                        ) : null}
                    </div>
                </div>
                {!isDeleted ? (
                    user.userName === senderID.userName ? (
                        <div className={styles.message_options}>
                            <div
                                className={styles.option}
                                onClick={() =>
                                    showEditMessageModal(this.props.message)
                                }
                            >
                                <BiEdit />
                            </div>
                            <div
                                className={styles.option}
                                onClick={() =>
                                    showDeleteMessageModal(this.props.message)
                                }
                            >
                                <AiOutlineDelete />
                            </div>
                            <div
                                className={styles.option}
                                onClick={showLastSeenModal}
                            >
                                <BiShow />
                            </div>
                            <div className={styles.option}>
                                <HiOutlineDotsVertical />
                            </div>
                        </div>
                    ) : null
                ) : null}
            </div>
        );
    }
}
export default Message;
