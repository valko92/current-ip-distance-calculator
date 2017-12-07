import React, { Component } from 'react';
import Form from './Form';
import Output from './Output';
import '../styles/App.css';
import dummyData from '../data/dummy.json';

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
    this.setState({
      outputTime: true,
      output: dummyData
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
