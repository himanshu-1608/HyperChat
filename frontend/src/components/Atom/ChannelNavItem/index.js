import { Component } from 'react';
import styles from './ChannelNavItem.module.css';

class ChannelNavItem extends Component {
    render() {
        let messageText;
        if(this.props.isBold == true)
            messageText = <div className={styles.bold_text}>{this.props.text}</div>
        else
            messageText = <div className={styles.text}>{this.props.text}</div>
        return (
            <div className={styles.item} onClick={this.props.onClick}>
                <div className={styles.symbol}>#</div>
                {messageText}
            </div>
        );
    }
}
export default ChannelNavItem;
