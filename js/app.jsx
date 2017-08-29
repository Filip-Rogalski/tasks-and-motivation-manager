import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MotivationBoard from './MotivationBoard.jsx';
import PersonalMotivation from './PersonalMotivation.jsx';
import TasksManager from './TasksManager.jsx';
import Entrance from './Entrance.jsx';
import "../sass/sass.scss";

class App extends Component {
    constructor(){
        super();
        this.state = {persons: [], tasks: [], logged: null};
    }
    
    componentWillMount = () => {
        this.setState({logged: (parseInt(localStorage.logged, 10) || null)}, function(){
            console.log(this.state.logged)
        });
    }
    
     handleLogin = (userid) => {
         this.setState({logged: userid}, function(){
               localStorage.logged = userid;
         });
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
        }).then(resp => {
            console.log(resp);
        });
    }
        
    render(){
        return (<div>
            <Entrance handleLogin={this.handleLogin}/>
            <PersonalMotivation logged={this.state.logged}/>
            <MotivationBoard logged={this.state.logged} persons={this.state.persons} tasks={this.state.tasks}/>
                {this.state.logged == 1000 && <TasksManager tasks={this.state.tasks} />}
        </div>);
    }
}

ReactDOM.render(<App />, document.getElementById('app'));