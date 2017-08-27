import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import LoginInfo from './LoginInfo.jsx';

class Entrance extends Component {
    constructor(){
        super();
        this.state = {user: 0, username: ''};
    }
    render(){
        return (<div>
          <h3>Motivation Board</h3>
           {this.state.user == 0 && <LoginForm />}
           {(this.state.user == 1 || this.state.user == 2) && <LoginInfo />}
        </div>);
    }
}

export default Entrance;