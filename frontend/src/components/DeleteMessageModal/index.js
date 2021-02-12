import { Component } from 'react';
import styles from './DeleteMessageModal.module.css';
import { VscChromeClose } from 'react-icons/vsc';

import {
    deleteMessageInDm,
    deleteMessageInChannel
} from '../../utils/message';

class DeleteMessageModal extends Component {

    deleteMessageClickHandler = () => {
        const { openChannel, openDm, user, hideModal } = this.props;
        if(openDm){
            const message = {
                messageID: this.props.deleteMessage._id
            };
            deleteMessageInDm(user._id, message, hideModal);
        }
        else if(openChannel){
            const message = {
                messageID: this.props.deleteMessage._id
            }
            deleteMessageInChannel(openChannel._id, message, hideModal);
        }
    }

    render() {
        const { hideModal, deleteMessage } = this.props;
        return (
            <div className={styles.modal}>
                <div className={styles.modal_box}>
                    <div className={styles.modal_inner_box}>
                        <div className={styles.modal_title}>Delete message</div>
                        <div className={styles.modal_desc}>
                            Are you sure you want to delete this message? This
                            cannot be undone.
                        </div>
                        <div className={styles.message_box}>
                            <div className={styles.message_user_image}>
                                <img src={deleteMessage.senderID.userProfilePicURL} alt="user" />
                            </div>
                            <div className={styles.message_info}>
                                <div className={styles.message_user_name}>
                                    {deleteMessage.senderID.userName}
                                    <span className={styles.message_time}>
                                        {deleteMessage.sentTime}
                                    </span>
                                </div>
                                <div className={styles.message}>
                                    {deleteMessage.messagePayload}
                                </div>
                            </div>
                        </div>
                        <div className={styles.btn_box}>
                            <div className={styles.cancel_delete_btn} onClick={hideModal}>Cancel</div>
                            {/* TODO: delete btn in DeleteMessageModal */}
                            <div className={styles.delete_btn} onClick={this.deleteMessageClickHandler}>Delete</div>
                        </div>
                        <div className={styles.cancel_btn} onClick={hideModal}>
                            <VscChromeClose />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default DeleteMessageModal;
