import { Component } from 'react';
import ChannelItem from '../../components/ChannelItem';
import Search from '../../components/Search';
import styles from './BrowseChannels.module.css';

class BrowseChannels extends Component {
    render() {
        return (
            <div className={styles.browsechannel_section}>
                <div className={styles.browsechannel_title}>
                    <div className={styles.browsechannel_details}>
                        <div className={styles.browsechannel_name}>
                            Channel browser
                        </div>
                    </div>
                    <div className={styles.browsechannel_options}>
                        {/* TODO: create channel btn will trigger createChannelModal */}
                        <div className={styles.create_channel}>
                            Create Channel
                        </div>
                    </div>
                </div>
                <div className={styles.browsechannel_box}>
                    {/* TODO: search input is here for browsechannel */}
                    <div className={styles.search_menu}>
                        <Search />
                    </div>
                    {/* TODO: channel list */}
                    <div className={styles.channel_list}>
                        <ChannelItem />
                    </div>
                </div>
            </div>
        );
    }
}
export default BrowseChannels;
