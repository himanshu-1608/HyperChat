import { Component } from 'react';
import NavItem from '../NavItem';
import styles from './NavBar.module.css';
import { BsChatSquareDots,BsThreeDotsVertical } from 'react-icons/bs';
import { RiWechatLine,RiArrowDownSFill } from 'react-icons/ri';
import { FiAtSign } from 'react-icons/fi';  
import CustomNavItem from '../NavItem/CustomNavItem';
import ChannelNavItem from '../ChannelNavItem';
import DmNavItem from '../DmNavItem';

class NavBar extends Component {
    render() {
        return (
            <div className={styles.navbar_section}>
                <div className={styles.title}>HyperVerge</div>
                <div className={styles.nav_items}>
                    <NavItem text="Threads" icon={<BsChatSquareDots />} />
                    <NavItem text="All DMs" icon={<RiWechatLine />} />
                    <NavItem text="Mentions & reactions" icon={<FiAtSign />} />
                    <NavItem text="More" icon={<BsThreeDotsVertical />} />
                    <CustomNavItem text="Channels" icon={<RiArrowDownSFill />}/>
                    {/*TODO: add channels here */}
                        <ChannelNavItem text="general" />
                        <ChannelNavItem text="Intern2021" />
                    <CustomNavItem text="DMs" icon={<RiArrowDownSFill />}/>
                    {/*TODO: add Dms here */}
                        <DmNavItem text="Rahul Yadav"/>
                </div>
            </div>
        );
    }
}
export default NavBar;
