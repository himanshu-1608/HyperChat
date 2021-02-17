import { Component } from 'react';
import styles from './LastSeenModal.module.css';
import { VscChromeClose } from 'react-icons/vsc';
import LastSeenItem from '../../Atom/LastSeenItem';

class LastSeenModal extends Component {
    compare = (a, b) => {
        if(a.userID._id > b.userID._id)
            return 1;
        return -1;
    }
    render() {
        const { message } = this.props;
        message.seenTime.sort(this.compare);
        message.deliveredTime.sort(this.compare);
        const userList = message.seenTime.map((seenObj, index) => {
            return <LastSeenItem key={index} seenObj={seenObj} deliveredObj={message.deliveredTime[index]}/>
        })

        return (
            <div className={styles.modal}>
                <div className={styles.modal_box}>
                    <div className={styles.modal_inner_box}>
                        <div className={styles.modal_title}>
                            {/* TODO: total member in the channel */}
                            Details
                        </div>
                        
                        <div className={styles.member_names}>
                            {userList}
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
