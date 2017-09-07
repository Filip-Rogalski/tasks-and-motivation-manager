import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

class Template extends Component {
    render(){
        return (
            <div>
                <div className="row">
                    <h1 className="mainTitle">Task Manager and Motivation Board</h1>
                    <ul className="mainMenu">
                        <li><IndexLink to="/">Login </IndexLink></li>
                        <li><Link to="/board">Motivation Board</Link>
                        </li>
                        <li><Link to="/tasks">Task Manager</Link></li>
                    </ul>
                </div>
                <div className="projectWrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Template;