import React, { Component } from 'react';
import filterTasks from './filterTasks_1';

class TaskList extends Component {
    constructor(){
        super();
        this.state = {
            tasksToShow: filterTasks([])
        };
    }
    
    componentDidMount() {
        fetch('http://localhost:3000/tasks').then(resp => {
            return resp.json();
        }).then(data => {
            this.setState({
                tasksToShow: filterTasks(data, [1, 3])
            })
        });
    }
    
    render(){
        return(
            <div>
                <ul>
                    {this.state.tasksToShow.map(task => (
                        <li key={task.id}>{task.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TaskList;
