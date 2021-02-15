import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './BrowseDms.module.css';
import { connect } from "react-redux";
import * as actionCreators from '../../actions/index';
import DmItem from '../../components/Atom/DmItem';

class BrowseDms extends Component {
    componentDidMount(){
        this.props.fetchUsers()
    }
    render() {
        const usersList = this.props.users.map(user => {
            return <DmItem 
                key={user.id} 
                user={user} 
                addDm={() => {
                    this.props.addDm(user, this.props.user._id);
                    this.props.history.push('/');
                }}/>
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
                    {usersList}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        users: state.general.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(actionCreators.fetchUsers()),
        addDm: (dm, userId) => dispatch(actionCreators.addDm(dm, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BrowseDms));
