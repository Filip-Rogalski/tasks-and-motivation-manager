import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MotivationBoard from './MotivationBoard.jsx';
import TasksManager from './TasksManager.jsx';
import TaskList from './TaskList.jsx';
import AddPersonButton from './AddPersonButton.jsx';
import AddTaskButton from './AddTaskButton.jsx';
import "../sass/sass.scss";

class App extends Component {
    constructor(){
        super();
        this.state = {persons: [], tasks: [], array: [1]};
    }
    
    //Fetch data from dbase:
    
    componentDidMount = () => {
         fetch('http://localhost:3000/db').then(resp => {
            return resp.json();
        }).then(data => {
             this.setState({
                 persons: data.persons,
                 tasks: data.tasks
             });
        });
    }
    
    addPerson = (event) => {
        console.log("addPerson");
        let newPerson = {
            name: "John",
            score: 0,
            currentTasks: [],
            prevTasks: []
        };
        
        fetch('http://localhost:3000/persons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( newPerson )
        });
        
    }
    
    addTask = (event) => {
        console.log("addTask");
        let newTask = {
            name: "Task",
            periodic: true,
            score: 100
        };
        
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( newTask )
        });
        
    }
    
    render(){
        return (<div>
            <MotivationBoard persons={this.state.persons} />
            <TasksManager tasks={this.state.tasks} />
            <TaskList filter={this.state.array}/>
            <AddPersonButton addPersonHandler={this.addPerson}/>
            <AddTaskButton addTaskHandler={this.addTask}/>
        </div>);
    }
}

ReactDOM.render(<App />, document.getElementById('app'));