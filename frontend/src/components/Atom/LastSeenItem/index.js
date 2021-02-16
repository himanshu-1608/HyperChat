import { Component } from "react";
import styles from './LastSeenItem.module.css';
import { formatTime } from '../../../utils/time';

class LastSeenItem extends Component{
    render(){
        const { seenObj, deliveredObj } = this.props;
        return(
            <div className={styles.user_detail_box} onClick={this.props.onClick}>
                <div className={styles.inner_box}>
                    <div className={styles.user_image}>
                        <img src={seenObj.userID.userProfilePicURL} alt="User"/>
                    </div>
                    <div className={styles.user_info}>
                        <div className={styles.user_name}>
                            {seenObj.userID.userName}
                        </div>
                        <div className={styles.user_time}>
                            <span>Seen time: {formatTime(seenObj.seenTime)}</span>
                            <span>Delivered time: {formatTime(deliveredObj.deliveredTime)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default LastSeenItem;