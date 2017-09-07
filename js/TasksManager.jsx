import React, { Component } from 'react';
import AddNewTaskForm from './AddNewTaskForm.jsx';

class TasksManager extends Component {

    constructor(){
        super();
        this.state = {tasks: []};
    }
    
    componentDidMount = () => {
        fetch('http://localhost:3000/tasks').then(resp => {
            return resp.json();
        }).then(data => {
             this.setState({
                 tasks: data
             });
        });
    }
    
    removeTask = (e) => {
        let taskid = e.target.parentElement.dataset.taskid;
        let fullTasksIndexArray = [];
        this.state.tasks.forEach(item => {
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
                {this.state.tasks.map(item => (
                    <li key={item.id} data-itemid={item.id}><span>{item.name}</span> | {item.periodic ? <span>Periodic</span> : <span>Non-Periodic</span>} |
                    <span className="value"> {item.score}</span> | <button onClick={this.removeTask}>Remove task</button></li>
                ))}
            </ul>
            <AddNewTaskForm />
        </div>);
    }
}
 
export default TasksManager;
    