import { Component } from 'react';
import styles from './LastSeenModal.module.css';
import { VscChromeClose } from 'react-icons/vsc';
import LastSeenItem from '../LastSeenItem';

class LastSeenModal extends Component {
    render() {
        return (
            <div className={styles.modal}>
                <div className={styles.modal_box}>
                    <div className={styles.modal_inner_box}>
                        <div className={styles.modal_title}>
                            {/* TODO: total member in the channel */}
                            Last Seen
                        </div>
                        
                        <div className={styles.member_names}>
                            {/* TODO: user details */}
                            <LastSeenItem />
                        </div>
                        <div className={styles.cancel_btn} onClick={this.props.hideModal}>
                            <VscChromeClose />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default LastSeenModal;
