import { Component } from 'react';
import styles from './CreateChannelModal.module.css';
import { VscChromeClose } from 'react-icons/vsc';

class CreateChannelModal extends Component {
    render() {
        return (
            <div className={styles.modal}>
                <div className={styles.modal_box}>
                    <div className={styles.modal_inner_box}>
                        <div className={styles.modal_title}>
                            Create a Channel
                        </div>
                        <div className={styles.modal_desc}>
                            Channels are where your team communicates. They’re
                            best when organized around a topic — #marketing, for
                            example.
                        </div>
                        <div className={styles.modal_inputs}>
                            <div className={styles.input_label}>Name</div>
                            {/* TODO: input for name of the channel */}
                            <div className={styles.input_box}>
                                <input
                                    className={styles.input}
                                    placeholder="#  e.g plan-budget"
                                />
                            </div>
                            <div className={styles.input_label}>
                                Description
                            </div>
                            {/* TODO: input for description of the channel */}
                            <div className={styles.input_box}>
                                <input className={styles.input} />
                            </div>
                            <div className={styles.text}>
                                What’s this channel about?
                            </div>
                        </div>
                        {/* TODO: button to create the channel */}
                        <div className={styles.create_btn_box}>
                            <div className={styles.create_btn}>Create</div>
                        </div>
                        {/* TODO: cancel btn for the modal  */}
                        <div className={styles.cancel_btn}>
                            <VscChromeClose />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CreateChannelModal;
