import { Component } from 'react';
import styles from './DmNavItem.module.css';

class DmNavItem extends Component {
    render() {
        return (
            <div className={styles.item}>
                <div className={styles.image}></div>
                <div className={styles.text}>{this.props.text}</div>
            </div>
        );
    }
}
export default DmNavItem;
