import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import LoginInfo from './LoginInfo.jsx';

class Entrance extends Component {
    render(){
        if (this.props.logged) {
        return (<div>
          <h3>Motivation Board</h3>
           <LoginInfo handleLogout={this.props.handleLogout}/>
        </div>);    
        } else {
            return (<div>
          <h3>Motivation Board</h3>
           <LoginForm handleLogin={this.props.handleLogin} />
           <button>Register</button>
        </div>);
        }
    }
}

export default Entrance;