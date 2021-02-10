import React, { Component } from 'react';
import MenuBar from '../../components/MenuBar';
import NavBar from '../../components/NavBar';
import styles from './Dashboard.module.css';
import ChatSection from '../../components/ChatSection'

class Dashboard extends Component{

    state={
        allUsers: [],
        allChannels: [],
        message: ''
    }

    componentDidMount(){
        fetch('http://localhost:8080/user/getAllUsers', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        })
        .then(result => result.json())
        .then(result => {
            console.log(result);
            this.setState({allUsers: result.users});
        })
        .catch(err => console.log(err));

        fetch('http://localhost:8080/channel/getAllChannels', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        })
        .then(result => result.json())
        .then(result => {
            console.log(result);
            this.setState({allChannels: result.channels});
        })
        .catch(err => console.log(err));
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
            </div>
        )
    }
}

export default Dashboard;