import { Component } from 'react';
import styles from './ChannelNavItem.module.css';

class ChannelNavItem extends Component {
    render() {
        return (
            <div className={styles.item} onClick={this.props.onClick}>
                <div className={styles.symbol}>#</div>
                <div className={styles.text}>{this.props.text}</div>
            </div>
        );
    }
}
export default ChannelNavItem;
