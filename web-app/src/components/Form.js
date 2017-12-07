import React, { Component } from 'react';
import '../styles/Form.css';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: '',
            destination: '',
            output: {},
        }
        
        this.getOriginInput = this.getOriginInput.bind(this);
        this.getDestinationInput = this.getDestinationInput.bind(this);
        this.submitInput = this.submitInput.bind(this);
    }


    getOriginInput(e) {
        this.setState({
            origin: e.target.value
        });
    }

    getDestinationInput(e) {
        this.setState({
            destination: e.target.value
        });
    }

    submitInput(e) {
        e.preventDefault();

        console.log(this.state.origin, this.state.destination);

        this.props.getData(this.state.origin, this.state.destination);
    }

    render() {
        return  (
            <form className="distance-form" onSubmit={this.submitInput} >
                <div className="input-container">
                    <label htmlFor="id">Give us your origin:</label>
                    <input
                        id="origin"
                        onChange={this.getOriginInput} 
                        type="text" 
                        placeholder="0.0.0.0" 
                        maxLength={15}
                        required 
                        value={this.state.origin} 
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="destination">Give us your destination</label>
                    <input
                        id="destination"
                        onChange={this.getDestinationInput} 
                        type="text" 
                        placeholder="0.0.0.0" 
                        maxLength={15}
                        required 
                        value={this.state.destination} 
                    />
                </div>

                <input className="submit-button" type="submit" value="Gimmie the distance!" />
            </form>
        );
    }
}

export default Form;