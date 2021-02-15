import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavItem from '../../Atom/NavItem';
import styles from './NavBar.module.css';
import { BsChatSquareDots,BsThreeDotsVertical } from 'react-icons/bs';
import { RiWechatLine,RiArrowDownSFill } from 'react-icons/ri';
import { FiAtSign } from 'react-icons/fi';  
import CustomNavItem from '../../Atom/NavItem/CustomNavItem';
import ChannelNavItem from '../../Atom/ChannelNavItem';
import DmNavItem from '../../Atom/DmNavItem';

class NavBar extends Component {

    render() {
        const subscribedChannelsList = this.props.subscribedChannels.map(channel => {
            return <ChannelNavItem 
                key={channel._id} 
                text={channel.channelName}
                isBold={channel.hasUnreadMessage}
                onClick={() => {
                    this.props.channelOpened(channel);
                    this.props.history.push('/');
                }} />
        });

        const dmList = this.props.friends.map(friend => {
            return <DmNavItem 
                    key={friend._id} 
                    text={friend.userName}
                    isBold={friend.hasUnreadMessage}
                    onClick={() => {
                        this.props.dmOpened(friend);
                        this.props.history.push('/');
                    }}/>
        });

        return (
            <div className={styles.navbar_section}>
                <div className={styles.title}>HyperVerge</div>
                <div className={styles.nav_items}>
                    <NavItem text="Threads" icon={<BsChatSquareDots />} />
                    <NavItem text="All DMs" icon={<RiWechatLine />} />
                    <NavItem text="Mentions & reactions" icon={<FiAtSign />} />
                    <NavItem text="More" icon={<BsThreeDotsVertical />} />
                    <CustomNavItem text="Channels" icon={<RiArrowDownSFill />}/>
                    {subscribedChannelsList}
                    <CustomNavItem text="DMs" icon={<RiArrowDownSFill />}/>
                    {dmList}
                </div>
            </div>
        );
    }
}
export default withRouter(NavBar);
