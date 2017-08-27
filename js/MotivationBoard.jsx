import React, { Component } from 'react';

class MotivationBoard extends Component {
    
    render(){
        return (<div>
        <h2>Motivation Board</h2>
        <ul>
            {this.props.persons.map(item => (
                <li key={item.id}><span>{item.name}</span><span> Aktualne zadania: 
                       {item.currentTasks.map(task => <span key={task}>{task}</span>)}
                    
                    </span><span> Punktacja: {item.score}</span></li>
            )
            )}
        </ul>
        </div>);
    }
}

export default MotivationBoard;