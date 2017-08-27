import React, { Component } from 'react';

class AddTaskPersonal extends Component {
    constructor(){
        super();
        this.state = {
            visible: false
        }
    }
    
    showHideTasks = () => {
        this.setState(prevState => ({
            visible: Boolean((Number(prevState.visible) + Number(true)) % 2)
        }));
    }
    
    render(){
        return(<div>
            <button onClick={this.showHideTasks}>Add task</button>
            {this.state.visible && 
            <div>
                <ul>
                    {this.props.tasks.map(task => (
                        <li key={task.id} data-taskid={task.id}><span>{task.name}</span> | <button onClick={this.props.addTask}>Add Task</button></li>
                    ))}
                </ul>
            </div>}
        </div>);
    }
}

export default AddTaskPersonal;