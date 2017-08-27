import React, { Component } from 'react';
import filterTasks from './filterTasks_1';

class TaskListPersonalCurrent extends Component {
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
               <h4>Current Tasks:</h4>
                <ul>
                    {this.state.tasksToShow.map(task => (
                        <li key={task.id} data-taskval={task.score} data-taskid={task.id}><span>{task.name}</span> | <span>Wartość: {task.score}</span> | <button onClick={this.props.removeTask}>Remove Task</button> | <button onClick={this.props.completeTask} id="completeTask">Complete</button></li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TaskListPersonalCurrent;
