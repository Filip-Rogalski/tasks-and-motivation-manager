import React, { Component } from 'react';
import TaskList from './TaskList.jsx';
import TaskListPersonalCurrent from './TaskListPersonalCurrent.jsx';
import AddTaskPersonal from './AddTaskPersonal.jsx';

class PersonalCard extends Component {
    constructor(props){
        super(props);
        this.state = {id: '', name: '', currentTasks: [], prevTasks: [], score: 0, tasks: []}
    }
    
    componentDidMount = () => {
        fetch('http://localhost:3000/persons/' + this.props.person.id).then(resp => {
            return resp.json();
        }).then(data => {
            this.setState({
                id: this.props.person.id,
                name: data.name,
                currentTasks: data.currentTasks,
                prevTasks: data.prevTasks,
                score: data.score
            });
        });
        fetch('http://localhost:3000/tasks').then(resp => {
            return resp.json();
        }).then(data => {
            this.setState({
                tasks: data
            });
        });
        
    }
    
    addTask = (e) => {
        console.log('addTask');
        let taskid = parseInt(e.target.parentElement.dataset.taskid, 10);
        let curTasks = this.state.currentTasks;
        curTasks.push(taskid);
        let updatedCurTasks = curTasks;
        this.setState({currentTasks: curTasks});
        updatedCurTasks.sort((a,b) => {
            return a - b;
        });
        let modification = {
            currentTasks: updatedCurTasks
        };
        
        console.log(modification);
        fetch('http://localhost:3000/persons/' + this.state.id, {
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
                <h3>Name: {this.state.name}</h3>
                    <TaskListPersonalCurrent logged={this.props.logged} personid={this.state.id} removeTask={this.removeTask} completeTask={this.completeTask} filter={this.state.currentTasks} />               
                <h4>Previous tasks:</h4>
                    <TaskList filter={this.state.prevTasks} />               
                <h4>Total score: {this.state.score}</h4>
                {this.props.admin === true && <AddTaskPersonal addTask={this.addTask} tasks={this.state.tasks}/>}
            </div>
        );
    }
}


export default PersonalCard;