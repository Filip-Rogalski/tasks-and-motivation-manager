import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MotivationBoard from './MotivationBoard.jsx';
import TasksManager from './TasksManager.jsx';
import TaskList from './TaskList.jsx';
import "../sass/sass.scss";

class App extends Component {
    constructor(){
        super();
        this.state = {persons: [{id: 1, name: 'krzys', score: 0, currentTasks: [1, 3], prevTasks: [2, 4]}, {id: 2, name: 'krysia', score: 0, currentTasks: [2, 4], prevTasks: [1, 3]}], tasks: [{id: 1, name: 'breakfast', periodic: true, score: 25}, {id: 2, name: 'organize party', periodic: false, score: 45}], array: [1, 3]};
    }
    
    getTasksByArrayOfIds = (array) => {
        let newArray = [];
        array.map(item => {
            this.state.tasks.map(task => {
                if(task.id == item) {
                    newArray.push(task.name);
                }
            })    
        });
        return newArray;
    }
    
    addPerson = (event) => {
        console.log(event.target);
    }
    
    addTask = (event) => {
        console.log(event.target);
    }
    
    render(){
        return (<div>
            <MotivationBoard persons={this.state.persons} />
            <TasksManager tasks={this.state.tasks} />
            <TaskList filter={this.state.array}/>
        </div>);
    }
}

ReactDOM.render(<App />, document.getElementById('app'));