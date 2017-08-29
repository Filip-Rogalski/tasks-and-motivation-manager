import React, { Component } from 'react';
import PersonalCard from './PersonalCard.jsx';
import AddNewPersonForm from './AddNewPersonForm.jsx';

class MotivationBoard extends Component {
    
    render(){
        return (<div><h2>Motivation Board</h2>
        <div className="motivation-board">
        
            {this.props.persons.map(person => (
                <PersonalCard logged={this.props.logged} key={person.id} person={person} tasks={this.props.tasks}/>
            )
            )}
        </div>
        <AddNewPersonForm />
        </div>);
    }
}

export default MotivationBoard;