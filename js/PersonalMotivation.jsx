import React, { Component } from 'react';
import TaskList from './TaskList.jsx';
import TaskListPersonalCurrent from './TaskListPersonalCurrent.jsx';

class PersonalMotivation extends Component {
    constructor(){
        super();
        this.state = {person: {
            id: 1,
            name: "Krzys",
            password: "1234",
            score: 95,
            currentTasks: [],
            prevTasks: []
        }
                     }
    }
    
    componentWillMount = () => {
        if (this.props.logged) {
            
            fetch('http://localhost:3000/persons/' + this.props.logged).then(resp => {
                return resp.json();
            }).then(data => {
                 this.setState({
                     person: data
                 }, function(){
                     console.log("this.state.person", this.state.person);
                 });
            });
        }
    }
    
    removeTask = (e) => {
        let personid = this.props.person.id;
        let taskid = parseInt(e.target.parentElement.dataset.taskid, 10);
        let curTasks = this.props.person.currentTasks;
        let updatedCurTasks = curTasks.filter(element => {
            return element !== taskid;
        });
        
        let modification = {
            currentTasks: updatedCurTasks,
        }
        fetch('http://localhost:3000/persons/' + personid, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify( modification )
        });
        
        
    }
    
    completeTask = (e) => {
        
        let personid = this.props.person.id;
       let taskid = parseInt(e.target.parentElement.dataset.taskid, 10);
        let taskval = parseInt(e.target.parentElement.dataset.taskval, 10);
        console.log('complete task', taskid, 'for', personid, 'value', taskval);
        let curTasks = this.props.person.currentTasks;
        let prevTasks = this.props.person.prevTasks;
        let prevScore = this.props.person.score;
        let updatedCurTasks = curTasks.filter(element => {
            return element !== taskid;
        });
        prevTasks.push(taskid);
        let updatedScore = prevScore + taskval;

        let modification = {
            currentTasks: updatedCurTasks,
            prevTasks: prevTasks,
            score: updatedScore
        }

        fetch('http://localhost:3000/persons/' + personid, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify( modification )
              });
    }
    
    render(){
        {if (this.props.logged) {
            console.log('Fifi', this.props.logged, this.state.person)
            return(
                <div className="personal-card">
                    <h3>Name: {this.state.person.name}</h3>
                        <TaskListPersonalCurrent removeTask={this.removeTask} completeTask={this.completeTask} filter={this.state.person.currentTasks} />               
                    <h4>Previous tasks:</h4>
                        <TaskList filter={this.state.person.prevTasks} />               
                    <h4>Total score: {this.state.person.score}</h4>
                </div>
            );
        } else {
            return null;
        }}
        
    }
}

export default PersonalMotivation