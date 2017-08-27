import React, { Component } from 'react';

class AddNewPersonForm extends Component {
    constructor(){
        super();
        this.state = {
            newPersonName: ''
        };
    }
    
    
    handleNewPersonName = (e) => {
        this.setState({newPersonName: e.target.value});
    }
        
    handleSubmit = (e) => {
        e.preventDefault();
     
        let newPerson = {
            name: this.state.newPersonName,
            score: 0,
            currentTasks: [],
            prevTasks: []
        }

        fetch('http://localhost:3000/persons', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify( newPerson )
              });
    }
    
    render(){
        return(
            <div>Add new person:
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="name" value={this.state.newPersonName} onChange={this.handleNewPersonName} placeholder="Person name" />
                    <input type="submit" value="Confirm" />
                </form>
            </div>
        );
    }
}

export default AddNewPersonForm;