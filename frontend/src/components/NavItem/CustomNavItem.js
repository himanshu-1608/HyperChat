import { Component } from 'react';
import styles from './CustomNavItem.module.css';
import { IconContext } from 'react-icons';
import { AiOutlinePlus } from 'react-icons/ai';

class CustomNavItem extends Component {
    render() {
        return (
            <div className={styles.item}>
                <div className={styles.icon}>
                    <IconContext.Provider
                        value={{ className: styles.icon_color }}
                    >
                        {this.props.icon}
                    </IconContext.Provider>
                </div>
                <div className={styles.text}>{this.props.text}</div>
                <div className={styles.add}>
                    <IconContext.Provider
                        value={{ className: styles.icon_color }}
                    >
                        <AiOutlinePlus/>
                    </IconContext.Provider>
                </div>
            </div>
        );
    }
}
export default CustomNavItem;
