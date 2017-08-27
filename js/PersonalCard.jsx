import React, { Component } from 'react';
import TaskList from './TaskList.jsx';
import TaskListPersonalCurrent from './TaskListPersonalCurrent.jsx';
import AddTaskPersonal from './AddTaskPersonal.jsx';

class PersonalCard extends Component {
    
    
    addTask = (e) => {
        let taskid = parseInt(e.target.parentElement.dataset.taskid, 10);
        let curTasks = this.props.person.currentTasks;
        curTasks.push(taskid);
        let updatedCurTasks = curTasks;
        updatedCurTasks.sort((a,b) => {
            return a - b;
        });
        let personid = this.props.person.id;
        let modification = {
            currentTasks: updatedCurTasks
        };
        
        fetch('http://localhost:3000/persons/' + personid, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify( modification )
                  });
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
        return(
            <div className="personal-card">
                <h3>Name: {this.props.person.name}</h3>
                    <TaskListPersonalCurrent removeTask={this.removeTask} completeTask={this.completeTask} filter={this.props.person.currentTasks} />               
                <h4>Previous tasks:</h4>
                    <TaskList filter={this.props.person.prevTasks} />               
                <h4>Total score: {this.props.person.score}</h4>
                <AddTaskPersonal addTask={this.addTask} tasks={this.props.tasks}/>
            </div>
        );
    }
}


export default PersonalCard;