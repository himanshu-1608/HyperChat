import React, { Component } from 'react';
import MenuBar from '../../components/MenuBar';
import NavBar from '../../components/NavBar';
import styles from './Dashboard.module.css';
import ChatSection from '../../components/ChatSection'
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';

class Dashboard extends Component{

    state={
        message: '',
        friends: [],
        subscribedChannels: []
    }

    componentDidMount(){
        const socket = openSocket('http://localhost:8080');
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.isAuth) {
          this.props.history.push('/login');
        }
    }

    inputChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    sendMessageHandler = () => {
        
    }

    render(){
        return(
            <div className={styles.dashboard_page}>
                <MenuBar />
                <div className={styles.main_box}>
                    <NavBar />
                    <ChatSection />
                </div>
                <button onClick={this.props.setLogout}>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
	return{
        user: state.auth.user,
        token: state.auth.token
	}
}

const mapDispatchToProps = dispatch => {
	return {
        setLogout: () => dispatch(actionCreators.setLogout())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);