import React, { Component } from 'react';
import styles from './Login.module.css';
import slack from '../../assests/gifs/slack.gif';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { FaFingerprint } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsPeopleCircle } from 'react-icons/bs';
class Login extends Component {
    state = {
        name:'',
        email: '',
        password: '',
        toggle: false,
    };

    inputChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitFormHandler = () => {
        fetch('http://localhost:8080/user/loginUser', {
            method: 'POST',
            body: JSON.stringify({
                userEmail: 'bharti@gmail.com',
                userPassword: 'bharti',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((result) => result.json())
            .then((result) => {
                console.log(result);
                this.props.setLogin(result.token);
            })
            .catch((err) => console.log(err));
    };

    changeToggle = (e) =>{
        this.setState({toggle:e})
    }
    render() {
        const { toggle } = this.state;
        return (
            <div className={styles.login_page}>
                <div className={styles.text_section}>
                    <img src={slack} alt="slack gif" />
                </div>
                { !toggle ? (
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
                                <span className={styles.link_section} onClick={() => this.changeToggle(true)}>Sign up now</span>
                            </div>
                        </div>
                    </div>
                ) : (
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
                                <span className={styles.link_section} onClick={() => this.changeToggle(false)}>Sign In</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Login;
