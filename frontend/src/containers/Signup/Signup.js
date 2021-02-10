import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actionCreators from '../../actions/index';

import styles from './Signup.module.css';
import slack from '../../assests/gifs/slack.gif';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { FaFingerprint } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsPeopleCircle } from 'react-icons/bs';

class Signup extends Component {
    state = {
        name:'',
        email: '',
        password: ''
    };

    inputChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    isFormDataValid = () => {
        const { name, email, password } = this.state;
        return name.trim().length && email.trim().length && password.trim().length;
    }

    submitFormHandler = () => {
        if(!this.isFormDataValid())
            return;

        const { name, email, password } = this.state;
        const user = {
            userName: name,
            userEmail: email,
            userPassword: password,
            userConfirmPassword: password,
            userProfilePic: ''
        }
        this.props.registerUser(user);
    }
    
    render() {
        return (
            <div className={styles.login_page}>
                <div className={styles.text_section}>
                    <img src={slack} alt="slack gif" />
                </div>
                <div className={styles.sigin_section}>
                    <div className={styles.login_box}>
                        <Input
                            name="name"
                            type="text"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.inputChangeHandler}
                            icon={<BsPeopleCircle />}
                        />
                        <Input
                            name="email"
                            type="email"
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
                            display="Sign Up"
                        />
                        <div className={styles.toggle_section}>
                            Already a member?
                            <Link className={styles.link_section} to='/login'>Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
	return {
		registerUser: (user) => dispatch(actionCreators.registerUser(user))
	}
}

export default connect(null, mapDispatchToProps)(Signup);
