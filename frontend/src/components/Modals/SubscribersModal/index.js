import { Component } from 'react';
import UserDetail from '../../Atom/UserDetail';
import styles from './SubscribersModal.module.css';
import { VscChromeClose } from 'react-icons/vsc';

class SubscribersModal extends Component {
    render() {
        const { channel } = this.props;
        const subscribersList = channel.channelSubscribers.map(subscriber => {
            return <UserDetail key={subscriber._id} user={subscriber} />
        })
        return (
            <div className={styles.modal}>
                <div className={styles.modal_box}>
                    <div className={styles.modal_inner_box}>
                        <div className={styles.total_members}>
                            {channel.channelSubscribers.length} members in
                        </div>
                        <div className={styles.modal_name}>
                            <span className={styles.hash}>#</span>
                            {channel.channelName}
                        </div>
                        <div className={styles.member_names}>
                            {subscribersList}
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
export default SubscribersModal;
