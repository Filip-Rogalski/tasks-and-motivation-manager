import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import filterTasks from './filterTasks_1';

class PersonalMotivation extends Component {
    constructor(){
        super();
        this.state = {id: '', name: '', currentTasks: [], prevTasks: [], score: 0, tasks: [], prevTasksToShow: [], currentTasksToShow: []}
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
                     prevTasks: data.prevTasks,
                     score: data.score
                 });
            });
        setTimeout(() => {
            fetch('http://localhost:3000/tasks').then(resp => {
                return resp.json();
            }).then(data => {
                this.setState({
                    tasks: data,
                    currentTasksToShow: filterTasks(data, this.state.currentTasks),
                    prevTasksToShow: filterTasks(data, this.state.prevTasks)
                })
            });
        }, 0);
    }
    
   componentDidUpdate = () => {
        let newCurrent = filterTasks(this.state.tasks, this.state.currentTasks);
       let newPrev = filterTasks(this.state.tasks, this.state.prevTasks);
       
        setTimeout(() => {
            this.setState({
                currentTasksToShow: newCurrent,
                prevTasksToShow: newPrev
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
        
        let modification = {
            currentTasks: updatedCurTasks,
        }
        fetch('http://localhost:3000/persons/' + this.state.id, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify( modification )
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
        this.setState({ currentTasks: updatedCurTasks, prevTasks: prevTasks, score: updatedScore });
        
        
        fetch('http://localhost:3000/persons/' + this.state.id, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify( modification )
              });
        
    }
    
   render(){
       return (
           <div className="personal-card">
                    <h3>Name: {this.state.name}</h3>
                       <h4>Current Tasks:</h4>
                        <ul>
                        {this.state.currentTasksToShow.map(task => (
                            <li key={task.id} data-taskval={task.score} data-taskid={task.id}><span>{task.name}</span> | <span className="value">{task.score}</span><button onClick={this.removeTask} id="removeTask">Remove Task</button> | <button onClick={this.completeTask} id="completeTask">Complete</button></li>
                        ))}
                        </ul>
                    <h4>Previous tasks:</h4>
                       
                     <ul>
                    {this.state.prevTasksToShow.map(task => (
                        <li key={task.id}><span>{task.name}</span> | <span className="value">{task.score}</span></li>
                    ))}
                </ul>
                    <h4>Total score: {this.state.score}</h4>
            </div>
       );
   }
}

ReactDOM.render(<PersonalMotivation />, document.getElementById('app'));