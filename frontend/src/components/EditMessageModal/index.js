import { Component } from 'react';
import styles from './EditMessageModal.module.css';
import { VscChromeClose } from 'react-icons/vsc';
import moment from 'moment';

import { editMessageInDm,
editMessageInChannel } from '../../utils/message';


class EditMessageModal extends Component {

    state={
        message: this.props.editMessage.messagePayload
    }

    inputChangeHandler = (e) => this.setState({message:e.target.value});

    isMessageValid = () => {
        const { message } = this.state;
        if(message === this.props.editMessage.messagePayload || !message.trim().length)
            return false;
        return true;
    }

    editMessageClickHandler = () => {
        if(!this.isMessageValid())
            return;
        
        const { openChannel, openDm, user, hideModal } = this.props;
        if(openDm){
            const message = {
                messageID: this.props.editMessage._id,
                messagePayload: this.state.message
            };
            editMessageInDm(user._id, message, hideModal);
        }
        else if(openChannel){
            const message = {
                messageID: this.props.editMessage._id,
                messagePayload: this.state.message
            }
            editMessageInChannel(openChannel._id, message, hideModal);
        }
    }

    render() {
        const { hideModal, editMessage } = this.props;
        return (
            <div className={styles.modal}>
                <div className={styles.modal_box}>
                    <div className={styles.modal_inner_box}>
                        <div className={styles.modal_title}>Edit message</div>
                        <div className={styles.message_box}>
                            <div className={styles.message_user_image}>
                                <img src={editMessage.senderID.userProfilePicURL} alt="user" />
                            </div>
                            <div className={styles.message_info}>
                                <div className={styles.message_user_name}>
                                    {editMessage.senderID.userName}
                                    <span className={styles.message_time}>
                                        {moment(editMessage.sentTime).format('LT')}
                                    </span>
                                </div>
                                <div className={styles.message}>
                                    <textarea 
                                        name='message'
                                        value={this.state.message}
                                        onChange={this.inputChangeHandler}/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.btn_box}>
                            <div className={styles.cancel_edit_btn} onClick={hideModal}>Cancel</div>
                            {/* TODO: edit btn in EditMessageModal */}
                            <div className={styles.edit_btn} onClick={this.editMessageClickHandler}>Edit</div>
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
export default EditMessageModal;
