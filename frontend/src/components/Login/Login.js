
import React, { Component } from 'react';

class Login extends Component{

    state={
        email: '',
        password: ''
    }

    inputChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    submitFormHandler = () => {
        fetch('http://localhost:8080/user/loginUser', {
            method: 'POST',
            body: JSON.stringify({
                userEmail: 'bharti@gmail.com',
                userPassword: 'bharti'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(result => result.json())
        .then(result => {
            console.log(result);
            this.props.setLogin(result.token);
        })
        .catch(err => console.log(err));
    }

    render(){
        return(
            <div>
                <input 
                    name='email'
                    type='text'
                    placeholder='email'
                    value={this.state.email}
                    onChange={this.inputChangeHandler}/>

                <input 
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.inputChangeHandler}/>
                <button onClick={this.submitFormHandler}>Login</button>
            </div>
        )
    }
}

export default Login;