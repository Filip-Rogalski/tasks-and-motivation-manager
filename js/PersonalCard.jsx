import React, { Component } from 'react';
import TaskList from './TaskList.jsx';
import TaskListPersonalCurrent from './TaskListPersonalCurrent.jsx';

class PersonalCard extends Component {
    
    completeTask = (e) => {
        
       let taskid = parseInt(e.target.parentElement.dataset.taskid, 10);
        let taskval = parseInt(e.target.parentElement.dataset.taskval, 10);
        console.log('complete task', taskid, 'for', this.props.person.id, 'value', taskval);
        let person = this.props.person.id;
        let curTasks = [];
        let prevTasks = [];
        let updatedCurTasks = [];
        let updatedPrevTasks = [];
        let prevScore = 0;
        let updatedScore = 0;
        
        fetch('http://localhost:3000/persons/' + person).then(resp => {
            return resp.json();
        }).then(data => {
            curTasks = data.currentTasks;
            prevTasks = data.prevTasks;
            prevScore = parseInt(data.score, 10);
        }).then(() => {
            console.log(curTasks, prevTasks);
            updatedCurTasks = curTasks.filter(element => {
                return element !== taskid;
            });
            prevTasks.push(taskid);
            updatedScore = prevScore + taskval;
            
            console.log('updatedCur', updatedCurTasks);
            console.log('updatedPrev', updatedPrevTasks);
            console.log('updatedScore', updatedScore);
            
            
            let modification = {
                currentTasks: updatedCurTasks,
                prevTasks: prevTasks,
                score: updatedScore
            }
            
            
            fetch('http://localhost:3000/persons/' + person, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify( modification )
                  }).then(resp => {
                  console.log(resp);
                  });            
        });
    }
    
    render(){
        return(
            <div className="personal-card">
                <h3>Name: {this.props.person.name}</h3>
                    <TaskListPersonalCurrent completeTask={this.completeTask} filter={this.props.person.currentTasks} />               
                <h4>Previous tasks:</h4>
                    <TaskList filter={this.props.person.prevTasks} />               
                <h4>Total score: {this.props.person.score}</h4>
                <h4>Add task</h4>
            </div>
        );
    }
}


export default PersonalCard;