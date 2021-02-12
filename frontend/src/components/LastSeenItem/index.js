import { Component } from "react";
import styles from './LastSeenItem.module.css';

class LastSeenItem extends Component{
    render(){
        return(
            <div className={styles.user_detail_box} onClick={this.props.onClick}>
                <div className={styles.inner_box}>
                    <div className={styles.user_image}>
                        {/* TODO: seen user url */}
                        <img src="" alt="User"/>
                    </div>
                    <div className={styles.user_info}>
                        {/* TODO: seen time user name */}
                        <div className={styles.user_name}>
                            Rahul Yadav
                        </div>
                        {/* TODO: timing of message seen */}
                        <div className={styles.user_time}>
                            <span>Seen time: 9:30 PM</span>
                            <span>Delivered time: 9:31 PM</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default LastSeenItem;