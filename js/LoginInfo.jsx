import React, { Component } from 'react';

class LoginInfo extends Component {
    render(){
        return (
            <div>Login Info
                <button onClick={this.props.handleLogout}>Log out</button>
            </div>
        );
    }
}

export default LoginInfo;