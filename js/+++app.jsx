import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import filterTasks from './filterTasks_1';

class Proba extends Component {
    constructor(){
        super();
        this.state = {id: 6, name: 'Herzog', currentTasks: [1,2,3,4,5,5,5], prevTasks: [6,7,8,9], score: 100, currentTasksToShow: [], tasks: [
  {
    "id": 1,
    "name": "breakfast",
    "periodic": true,
    "score": 25
  },
  {
    "id": 2,
    "name": "organize party",
    "periodic": false,
    "score": 45
  },
  {
    "id": 3,
    "name": "wash dishes",
    "periodic": true,
    "score": 25
  },
  {
    "name": "Task",
    "periodic": true,
    "score": 100,
    "id": 4
  },
  {
    "name": "Task",
    "periodic": true,
    "score": 100,
    "id": 5
  },
  {
    "name": "Task",
    "periodic": true,
    "score": 100,
    "id": 6
  },
  {
    "name": "Trash bin",
    "periodic": "false",
    "score": "23",
    "id": 7
  },
  {
    "name": "Okna",
    "periodic": false,
    "score": "200",
    "id": 8
  },
  {
    "name": "monthly report",
    "periodic": false,
    "score": "200",
    "id": 9
  },
  {
    "name": "",
    "periodic": false,
    "score": 0,
    "id": 10
  }
]};
    }

    componentWillMount = () => {
        console.log('wm');
        this.setState({
            currentTasksToShow: filterTasks(this.state.tasks, this.state.currentTasks)
        })
    }
    
    componentDidUpdate = () => {
        let newArray = filterTasks(this.state.tasks, this.state.currentTasks);
        setTimeout(() => {
            this.setState({
                currentTasksToShow: newArray
            })
        }, 0);
    }
    
    removeTask = (e) => {
        console.log('rt');
        let personid = this.state.id;
        let taskid = parseInt(e.target.parentElement.dataset.taskid, 10);
        let curTasks = this.state.currentTasks;
        let updatedCurTasks = curTasks.filter(element => {
            return element !== taskid;
        });
        this.setState({ currentTasks: updatedCurTasks });
    }
    
   render(){
       return (
           <div className="personal-card">
                    <h3>Name: {this.state.name}</h3>
                       <h4>Current Tasks:</h4>
                        <ul>
                        {this.state.currentTasksToShow.map(task => (
                            <li key={task.id} data-taskval={task.score} data-taskid={task.id}><span>{task.name}</span> | <span>Wartość: {task.score}</span><button onClick={this.removeTask} id="removeTask">Remove Task</button> | <button onClick={this.completeTask} id="completeTask">Complete</button></li>
                        ))}
                        </ul>
                    <h4>Previous tasks:</h4>
                    <h4>Total score: {this.state.score}</h4>
            </div>
       );
   }
}

ReactDOM.render(<Proba />, document.getElementById('app'));