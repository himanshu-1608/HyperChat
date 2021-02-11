import { Component } from 'react';
import styles from './DeleteMessageModal.module.css';
import { VscChromeClose } from 'react-icons/vsc';

class DeleteMessageModal extends Component {
    render() {
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
                            {/* TODO: user image should be added in src */}
                            <div className={styles.message_user_image}>
                                <img src="" alt="user" />
                            </div>
                            <div className={styles.message_info}>
                                {/* TODO: user name */}
                                <div className={styles.message_user_name}>
                                    Rahul Yadav
                                    <span className={styles.message_time}>
                                        9:30 PM
                                    </span>
                                </div>
                                {/* TODO: delete message display */}
                                <div className={styles.message}>
                                    Hi theres flasd fjskd
                                </div>
                            </div>
                        </div>
                        <div className={styles.btn_box}>
                            {/* TODO: cancel btn in DeleteMessageModal */}
                            <div className={styles.cancel_delete_btn}>Cancel</div>
                            {/* TODO: delete btn in DeleteMessageModal */}
                            <div className={styles.delete_btn}>Delete</div>
                        </div>
                        {/* TODO: cancel the modal  */}
                        <div className={styles.cancel_btn}>
                            <VscChromeClose />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default DeleteMessageModal;
