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
        console.log('handleName');
        this.setState({newTaskName: e.target.value});
    }
    
    handleNewTaskValue = (e) => {
        console.log('handleVal');
        this.setState({newTaskValue: e.target.value});
    }
    
    handleNewTaskPeriodical = (e) => {
        console.log('handlePer');
        this.setState({newTaskPeriodical: e.target.value});
    }
    
    handleSubmit = (e) => {
        console.log('handleSubm');
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
            <div>Add new task:
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="name" value={this.state.newTaskName} onChange={this.handleNewTaskName} placeholder="Task name" />
                    <input type="text" id="value" value={this.state.newTaskValue} onChange={this.handleNewTaskValue} placeholder="Task value" />
                    <label>Periodic</label>
                    <input type="checkbox" id="periodic" value={this.state.newTaskPeriodical} onChange={this.handleNewTaskPeriodical} />
                    <input type="submit" value="Confirm" />
                </form>
            </div>
        );
    }
}

export default AddNewTaskForm;