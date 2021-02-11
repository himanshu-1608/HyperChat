import { Component } from 'react';
import styles from './BrowseDms.module.css';
import UserDetail from '../../components/UserDetail';

class BrowseDms extends Component {
    render() {
        return (
            <div className={styles.browsedm_section}>
                <div className={styles.browsedm_title}>
                    <div className={styles.browsedm_details}>
                        <div className={styles.browsedm_name}>
                            All direct messages
                        </div>
                    </div>
                </div>
                <div className={styles.search_box}>
                    <div className={styles.to}>To:</div>
                    {/* TODO: search box for user list */}
                    <input
                        className={styles.search_input}
                        placeholder="Type the name of a person"
                    />
                </div>
                <div className={styles.user_list}>
                    {/* TODO: user list add onclick on with respective function*/}
                    {/* <UserDetail onclick={this.props.something}/> */}
                    <UserDetail />
                </div>
            </div>
        );
    }
}
export default BrowseDms;
