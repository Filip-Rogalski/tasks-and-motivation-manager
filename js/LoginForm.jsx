import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {userName: '', password: ''};
    }
    
    
    /* Move handleSubmit to parent component. */
    
    handleSubmit = (e) => {
        console.log('handlesubmit');
        e.preventDefault();
        
        let user = {
            name: this.state.userName,
            password: this.state.password
        };
        
        console.log(user);
        fetch('http://localhost:3000/persons?name=' + user.name + '&password=' + user.password).then(resp => {
            return resp.json();
        }).then(data => {
            if (data.length == 1) {
                console.log('user id', data[0].id);
            } else {
                console.log('błąd logowania!');
            }
        })
        
        
    }
    
    handleUserName = (e) => {
        console.log('handleUserName');
        this.setState({userName: e.target.value});
    }
    
    handlePassword = (e) => {
        console.log('handlePasword');
        this.setState({password: e.target.value});
    }
    
    
    render(){
        return (
            <div>Login Form
               <form onSubmit={this.handleSubmit}>
                    <input type="text" id="userName" value={this.state.userName} onChange={this.handleUserName} placeholder="username" />
                    <input type="password" id="password" value={this.state.password} onChange={this.handlePassword} placeholder="password" />
                    <input type="submit" value="login" />
                </form>
            </div>
        );
    }
}

export default LoginForm;