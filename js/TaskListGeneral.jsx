import React, { Component } from 'react';
import filterTasks from './filterTasks_1';

class TaskListGeneral extends Component {
    constructor(){
        super();
        this.state = {
            tasksToShow: filterTasks([])
        };
    }
    
    componentDidMount = () => {
        fetch('http://localhost:3000/tasks').then(resp => {
            return resp.json();
        }).then(data => {
            this.setState({
                tasksToShow: filterTasks(data, this.props.filter)
            })
        });
    }
    
    render(){
        return(
            <div>
                <ul>
                    {this.state.tasksToShow.map(task => (
                        <li key={task.id}><span>{task.name}</span> | <span>Wartość: {task.score}</span></li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TaskListGeneral;
