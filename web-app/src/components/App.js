import React, { Component } from 'react';
import Form from './Form';
import Output from './Output';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outputTime: false,
      output: {},
    }
    
    this.getData = this.getData.bind(this);
  }

  getData(origin, destination) {
    fetch(`http://localhost:3001/distance?origin=${origin}&destination=${destination}`)
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        outputTime: true,
        output: response
      });
    }).catch(function(error) {
        console.log(` Error fetching distance ${error.message}`);
    });
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">How  long is the drive?</h1>
        </header>

        {this.state.outputTime ?

          <Output {...this.state.output} />
        :
          <Form getData={this.getData} /> 
        }
      </div>
    );
  }
}

export default App;
