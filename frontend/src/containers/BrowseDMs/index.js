import { Component } from 'react';
import styles from './BrowseDms.module.css';
import UserDetail from '../../components/Atom/UserDetail';
import { connect } from "react-redux";
import * as actionCreators from '../../actions/index';

class BrowseDms extends Component {
    componentDidMount(){
        this.props.fetchUsers()
    }
    render() {
        const usersList = this.props.users.map(user => {
            return <UserDetail key={user._id} user={user}/>
        })
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
                    {usersList}
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        users: state.general.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(actionCreators.fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseDms);
