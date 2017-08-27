import React, { Component } from 'react';

class AddPersonButton extends Component {
    render(){
        return(
            <button onClick={this.props.addPersonHandler} id="addPerson">Add (mock) person to database</button>
        );
    }
}

export default AddPersonButton;