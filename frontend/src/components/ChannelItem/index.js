import { Component } from "react";
import axios from '../../axios';
import styles from './ChannelItem.module.css';

class ChannelItem extends Component{

    render(){
        const { channelName, channelSubscribers } = this.props.channel;
        return(
            <div className={styles.channelitem_box}>
                <div className={styles.channel_info}>
                    <div className={styles.channel_name}>
                        #{channelName}
                    </div>
                    <div className={styles.channel_subscribers}>
                        {channelSubscribers.length} members
                    </div>
                </div>
                <div className={styles.channel_join_box}>
                    <div className={styles.channel_join_btn} onClick={this.props.onClick}>
                        Join
                    </div>
                </div>
            </div>
        );
    }
}
export default ChannelItem;