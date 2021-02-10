import { Component } from 'react';
import styles from './NavItem.module.css';
import { IconContext } from 'react-icons';

class NavItem extends Component {
    render() {
        return (
            <div className={styles.item}>
                <div className={styles.icon}>
                    <IconContext.Provider value={{ className:styles.icon_color}}>
                        {this.props.icon}
                    </IconContext.Provider>
                </div>
                <div className={styles.text}>{this.props.text}</div>
            </div>
        );
    }
}
export default NavItem;
