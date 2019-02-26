import React, { Component } from 'react';
import classes from './App.css';
import Person from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      {name: 'Max', age: 28},
      {name: 'Manu', age: 29}, 
      {name: 'Stephanie', age: 26}
    ],
    otherState: 'Some other value',
    showPersons: false
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  //componentWillMount() {
  //  console.log('[App.js] componentWillMount')
  //}
  
  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id  === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    //onst person = Object.assign({}, this.state.person[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState ({persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render (){
    console.log('[App.js] render');
    let persons = null;
    
    if (this.state.showPersons){
      persons = <Person 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} />;
    }

    return (
      <div className={classes.App}>
        <Cockpit 
        title={this.props.appTitle}
        showPersons={this.state.showPersons} 
        person={this.state.persons}
        clicked={this.togglePersonsHandler} />
        {persons}
      </div>
    );
  }
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'))
}

export default App;
