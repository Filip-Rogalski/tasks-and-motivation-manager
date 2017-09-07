import React, { Component } from 'react';
import TaskList from './TaskList.jsx';
import ReactDOM from 'react-dom';
import TaskListPersonalCurrent from './TaskListPersonalCurrent.jsx';

class PersonalMotivation extends Component {
    constructor(){
        super();
        this.state = {id: '', name: '', currentTasks: [], prevTasks: [], score: 0}
    }
    
    componentWillMount = () => {
        let userId = parseInt(localStorage.logged);
        fetch('http://localhost:3000/persons/' + userId).then(resp => {
                return resp.json();
            }).then(data => {
                 this.setState({
                     id: data.id,
                     name: data.name,
                     currentTasks: data.currentTasks,
                     pervTasks: data.prevTasks,
                     score: data.score
                 });
            });
    }
    
    
    removeTask = (e) => {
        console.log('rt');
        let personid = this.state.id;
        let taskid = parseInt(e.target.parentElement.dataset.taskid, 10);
        let curTasks = this.state.currentTasks;
        let updatedCurTasks = curTasks.filter(element => {
            return element !== taskid;
        });
        this.setState({ currentTasks: curTasks });
        let modification = {
            currentTasks: updatedCurTasks,
        }
        fetch('http://localhost:3000/persons/' + this.state.id, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify( modification )
        }).then(resp => {
            console.log(resp);
        });
        
        
    }
    
    completeTask = (e) => {
        
        let personid = this.state.id;
       let taskid = parseInt(e.target.parentElement.dataset.taskid, 10);
        let taskval = parseInt(e.target.parentElement.dataset.taskval, 10);
        let curTasks = this.state.currentTasks;
        let prevTasks = this.state.prevTasks;
        let prevScore = this.state.score;
        let updatedCurTasks = curTasks.filter(element => {
            return element !== taskid;
        });
        prevTasks.push(taskid);
        let updatedScore = prevScore + taskval;

        let modification = {
            currentTasks: updatedCurTasks,
            prevTasks: prevTasks,
            score: updatedScore
        };
        this.setState({ currentTasks: curTasks, prevTasks: prevTasks, score: updatedScore });
        fetch('http://localhost:3000/persons/' + this.state.id, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify( modification )
              }).then(resp => {
            console.log(resp);
        });
    }
    
   render(){
       return (
           <div className="personal-card">
                    <h3>Name: {this.state.name}</h3>
                        <TaskListPersonalCurrent removeTask={this.removeTask} completeTask={this.completeTask} filter={this.state.currentTasks} />               
                    <h4>Previous tasks:</h4>
                        <TaskList filter={this.state.prevTasks} />               
                    <h4>Total score: {this.state.score}</h4>
            </div>
       );
   }
}

export default PersonalMotivation