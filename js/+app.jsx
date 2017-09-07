import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router,
    Route,
    IndexRoute,
    hashHistory
} from 'react-router';
import Entrance from './Entrance.jsx';
import App1 from './App1.jsx';
import "../sass/sass.scss";

class App extends Component {
    constructor(){
        super();
        this.state = {logged: null};
    }
    
    componentWillMount = () => {
        this.setState({logged: (parseInt(localStorage.logged, 10) || null)});
    }
    
     handleLogin = (userid) => {
         this.setState({logged: userid}, function(){
               localStorage.logged = userid;
         });
    }
     
     handleLogout = () => {
         this.setState({logged: null});
         localStorage.clear();
     }
    
    render(){
        return (
            <div>
            {this.state.logged === null ?
            <Entrance logged={this.state.logged} handleLogin={this.handleLogin} handleLogout={this.handleLogout} /> : <App1 logged={this.state.logged} />}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));