import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor(){
        super();
        this.state = {
            name: '', 
            currentTasks: [], 
            prevTasks: [], 
            score: 0, 
            prevTasksToShow: [], 
            currentTasksToShow: [], 
            tasksToAdd: []
        };
        console.log(this.state);
    }
    
    componentDidMount = () => {
        fetch('http://localhost:3000/persons/3').then(resp => {
            return resp.json();
        }).then(data => {
            this.setState({
                name: data.name,
                currentTasks: data.currentTasks,
                prevTasks: data.prevTasks,
                score: data.score
            })
        });
    }
    
    render(){
        return (
            <div>Oki
                <h1>{this.state.name}</h1>
                <p>{this.state.score}</p>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));