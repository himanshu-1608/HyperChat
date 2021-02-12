import { Component } from 'react';
import styles from './EditMessageModal.module.css';
import { VscChromeClose } from 'react-icons/vsc';

class EditMessageModal extends Component {
    render() {
        return (
            <div className={styles.modal}>
                <div className={styles.modal_box}>
                    <div className={styles.modal_inner_box}>
                        <div className={styles.modal_title}>Edit message</div>
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
                                        {/* TODO: original message should be filled in text area  */}
                                        <textarea />
                                    </div>
                            </div>
                        </div>
                        <div className={styles.btn_box}>
                            {/* TODO: cancel btn in EditMessageModal */}
                            <div className={styles.cancel_edit_btn}>Cancel</div>
                            {/* TODO: edit btn in EditMessageModal */}
                            <div className={styles.edit_btn}>Edit</div>
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
export default EditMessageModal;
