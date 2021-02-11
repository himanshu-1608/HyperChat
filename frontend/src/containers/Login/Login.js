import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actionCreators from '../../actions/index';

import styles from './Login.module.css';
import slack from '../../assests/gifs/slack.gif';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { FaFingerprint } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    componentDidMount(){
        if(this.props.isAuth)
            this.props.history.push('/');
    }

    componentWillReceiveProps(newProps) {
        if (newProps.isAuth) {
          this.props.history.push('/');
        }
    }
    

    inputChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    isFormDataValid = () => {
        const { email, password } = this.state;
        return email.trim().length && password.trim().length;
    }

    submitFormHandler = () => {
        if(!this.isFormDataValid())
            return;

        const { email, password } = this.state;
        const user = {
            userEmail: email,
            userPassword: password
        }
        this.props.loginUser(user);
    }
    
    render() {
        return (
            <div className={styles.login_page}>
                <div className={styles.text_section}>
                    <img src={slack} alt="slack gif" />
                </div>
                <div className={styles.login_section}>
                    <div className={styles.login_box}>
                        <Input
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.inputChangeHandler}
                            icon={<HiOutlineMail />}
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.inputChangeHandler}
                            icon={<FaFingerprint />}
                        />
                        <Button
                            onClick={this.submitFormHandler}
                            display="Sign In"
                        />
                        <div className={styles.toggle_section}>
                            Not a member? 
                            <Link className={styles.link_section} to='/signup'>Sign up now</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = dispatch => {
	return {
		loginUser: (user) => dispatch(actionCreators.loginUser(user))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
