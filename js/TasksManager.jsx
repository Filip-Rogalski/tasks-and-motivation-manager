import React, { Component } from 'react';

class TasksManager extends Component {
    render(){
        return (<div>
            <h2>Tasks Manager</h2>
            <ul>
                {this.props.tasks.map(item => (
                    <li key={item.id}><span>{item.name}</span>
                    <span> Punktacja: {item.score}</span> </li>
                ))}
            </ul>
        </div>);
    }
}

export default TasksManager;