import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

class TemplateUser extends Component {
    render(){
        return (
            <div>
                <div className="row">
                    <h1 className="mainTitle">Task Manager and Motivation Board</h1>
                    <ul className="mainMenu">
                        <li><IndexLink to="/">Home </IndexLink></li>
                        <li><Link to="/board">Motivation Board</Link>
                        </li>
                        <li><Link to="/mytasks">My Tasks</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>
                <div className="projectWrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default TemplateUser;