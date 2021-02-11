import { Component } from "react";
import styles from './ChannelItem.module.css';

class ChannelItem extends Component{
    render(){
        return(
            <div className={styles.channelitem_box}>
                <div className={styles.channel_info}>
                    {/* TODO: channel name */}
                    <div className={styles.channel_name}>
                        #general
                    </div>
                    {/* TODO: channel total subscribers */}
                    <div className={styles.channel_subscribers}>
                        10 members
                    </div>
                </div>
                <div className={styles.channel_join_box}>
                    {/* TODO: channel join btn */}
                    <div className={styles.channel_join_btn}>
                        Join
                    </div>
                </div>
            </div>
        );
    }
}
export default ChannelItem;