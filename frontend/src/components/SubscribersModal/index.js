import { Component } from 'react';
import UserDetail from '../UserDetail';
import styles from './SubscribersModal.module.css';
import { VscChromeClose } from 'react-icons/vsc';

class SubscribersModal extends Component {
    render() {
        return (
            <div className={styles.modal}>
                <div className={styles.modal_box}>
                    <div className={styles.modal_inner_box}>
                        <div className={styles.total_members}>
                            {/* TODO: total member in the channel */}
                            25 members in
                        </div>
                        <div className={styles.modal_name}>
                            <span className={styles.hash}>#</span>
                            {/* TODO: channel name */}
                            proj-sde-bootcamp-batch-3-2-gitlab
                        </div>
                        <div className={styles.member_names}>
                            {/* TODO: user details */}
                            <UserDetail />
                        </div>
                        <div className={styles.cancel_btn}>
                            <VscChromeClose />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SubscribersModal;
