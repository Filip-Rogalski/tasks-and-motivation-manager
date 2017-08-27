import React, { Component } from 'react';

class AddTaskButton extends Component {
    render(){
        return(
            <button onClick={this.props.addTaskHandler} id="addTask">Add (mock) task to database</button>
        );
    }
}

export default AddTaskButton;