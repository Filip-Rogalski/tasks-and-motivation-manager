import React, { Component } from 'react';
import PersonalCard from './PersonalCard.jsx';

class MotivationBoard extends Component {
    
    render(){
        return (<div className="motivation-board">
        <h2>Motivation Board</h2>
            {this.props.persons.map(person => (
                <PersonalCard key={person.id} person={person}/>
            )
            )}
        </div>);
    }
}

export default MotivationBoard;