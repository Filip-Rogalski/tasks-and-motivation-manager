import React, { Component } from 'react';

class AddTaskPersonal extends Component {
    constructor(){
        super();
        this.state = {
            visible: false,
            tasks: []
        }
    }
    
    componentWillMount = () => {
        fetch('http://localhost:3000/tasks').then(resp => {
                return resp.json();
            }).then(data => {
                 this.setState({
                     tasks: data
                 });
            });
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
                    {this.state.tasks.map(task => (
                        <li key={task.id} data-taskid={task.id}><span>{task.name}</span> | <button onClick={this.props.addTask}>Add Task</button></li>
                    ))}
                </ul>
            </div>}
        </div>);
    }
}

export default AddTaskPersonal;