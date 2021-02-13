import { Component } from 'react';
import { connect } from 'react-redux';
import ChannelItem from '../../components/Atom/ChannelItem';
import Search from '../../components/Atom/Search';
import styles from './BrowseChannels.module.css';
import * as actionCreators from '../../actions/index';

class BrowseChannels extends Component {

    componentDidMount(){
        this.props.fetchChannels();
    }

    render() {

        const { showCreateChannelModal, channels, joinChannel } = this.props;

        const channelList = channels.map(channel => {
            return <ChannelItem key={channel._id} channel={channel} onClick={() => joinChannel(channel._id)}/>
        })

        return (
            <div className={styles.browsechannel_section}>
                <div className={styles.browsechannel_title}>
                    <div className={styles.browsechannel_details}>
                        <div className={styles.browsechannel_name}>
                            Channel browser
                        </div>
                    </div>
                    <div className={styles.browsechannel_options}>
                        <div className={styles.create_channel} onClick={showCreateChannelModal}>
                            Create Channel
                        </div>
                    </div>
                </div>
                <div className={styles.browsechannel_box}>
                    {/* TODO: search input is here for browsechannel */}
                    <div className={styles.search_menu}>
                        <Search />
                    </div>
                    <div className={styles.channel_list}>
                        {channelList}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        channels: state.general.channels
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchChannels: () => dispatch(actionCreators.fetchChannels()),
        joinChannel: channelId => dispatch(actionCreators.joinChannel(channelId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseChannels);
