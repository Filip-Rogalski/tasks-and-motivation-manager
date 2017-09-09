import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

class LoginInfo extends Component {
    render(){
        return (
            <div className="login-info"><div className="info">You're logged</div>
               <button onClick={this.props.handleLogout}>Logout</button>
            </div>
        );
    }
}

export default LoginInfo;