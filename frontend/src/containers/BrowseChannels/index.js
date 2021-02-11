import { Component } from 'react';
import { connect } from 'react-redux';
import ChannelItem from '../../components/ChannelItem';
import Search from '../../components/Search';
import styles from './BrowseChannels.module.css';
import * as actionCreators from '../../actions/index';
import axios from '../../axios';

class BrowseChannels extends Component {

    componentDidMount(){
        this.props.fetchChannels();
    }

    joinChannelHandler = (channel) => {
        axios.post(`/channels/${channel._id}/join`)
        .then(() => {
            this.props.joinChannel(channel);
            this.props.history.push('/');
        })
        .catch(err => console.log(err));
    }

    render() {

        const channelList = this.props.channels.map(channel => {
            return <ChannelItem key={channel._id} channel={channel} onClick={() => this.joinChannelHandler(channel)}/>
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
        joinChannel: (channel) => dispatch(actionCreators.fetchChannels(channel))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseChannels);
