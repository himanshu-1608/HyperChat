import { Component } from 'react';
import styles from './MenuBar.module.css';
import { AiOutlineHistory } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';

class MenuBar extends Component {
    render() {
        return (
            <div className={styles.menu_bar}>
                <div className={styles.menu_options}>
                    <div className={styles.history}>
                        <AiOutlineHistory />
                    </div>
                    <div className={styles.search}>Search</div>
                    <div className={styles.help}>
                        <BiHelpCircle />
                    </div>
                </div>
                <div className={styles.logout_btn} onClick={this.props.setLogout}>
                    <FiLogOut />
                </div>
            </div>
        );
    }
}
export default MenuBar;
