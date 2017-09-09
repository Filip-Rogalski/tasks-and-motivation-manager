import React, { Component } from 'react';

class AddNewTaskForm extends Component {
    constructor(){
        super();
        this.state = {
            newTaskName: '',
            newTaskValue: 0,
            newTaskPeriodical: false
        };
    }
    
    
    handleNewTaskName = (e) => {
        this.setState({newTaskName: e.target.value});
    }
    
    handleNewTaskValue = (e) => {
        this.setState({newTaskValue: e.target.value});
    }
    
    handleNewTaskPeriodical = (e) => {
        this.setState({newTaskPeriodical: e.target.value});
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
     
         let newTask = {
            name: this.state.newTaskName,
            periodic: this.state.newTaskPeriodical,
            score: this.state.newTaskValue
        }

        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify( newTask )
              });
    }
    
    render(){
        return(
            <div className="new-task-form"><div className="label">Add new task</div>
                <form onSubmit={this.props.handleSubmit}>
                    <input type="text" id="name" value={this.props.newTaskName} onChange={this.props.handleNewTaskName} placeholder="Task name" />
                    <input type="number" id="value" value={this.props.newTaskValue} onChange={this.props.handleNewTaskValue} placeholder="0" />
                    <div className="checkbox-label">Periodical</div>
                    <input type="checkbox" id="periodical" value={this.props.newTaskPeriodical} onChange={this.props.handleNewTaskPeriodical} />
                    <input type="submit" value="Confirm" />
                </form>
            </div>
        );
    }
}

export default AddNewTaskForm;