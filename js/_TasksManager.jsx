import React, { Component } from 'react';
import AddNewTaskForm from './AddNewTaskForm.jsx';

class TasksManager extends Component {
    
    removeTask = (e) => {
        let taskid = e.target.parentElement.dataset.taskid;
        let fullTasksIndexArray = [];
        this.props.tasks.forEach(item => {
            fullTasksIndexArray.push(item.id);
        })
        let updatedFullTasksIndexArray = fullTasksIndexArray.filter(item => {
            return parseInt(item, 10) !== parseInt(taskid, 10);
        })
    }
    
    render(){
        return (<div>
            <h2>Tasks Manager</h2>
            <ul>
                {this.props.tasks.map(item => (
                    <li key={item.id} data-itemid={item.id}><span>{item.name}</span>
                    <span className="value"> Punktacja: {item.score}</span> | <button onClick={this.removeTask}>Remove task</button></li>
                ))}
            </ul>
            <AddNewTaskForm />
        </div>);
    }
}

export default TasksManager;