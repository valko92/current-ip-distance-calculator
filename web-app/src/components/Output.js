import React from 'react';
import '../styles/Output.css';

const distanceQuip= dist => {
    let quip = '';
    if (dist.indexOf('day') > 0) {
        quip = 'Damn, that\'s far.';
    } else {
        quip = 'Well, that ain\'t far';
    }
    return quip;
}

const Output = (props) => {
    return  (
        <div className="output-container">
            <div className="origin">
                <div>Origin (Where are you leaving from?)</div>
                <div>{props.origin}</div>
            </div>
            <div className="destination">
                <div>Destination (Where are you going?)</div>
                <div>{props.destination}</div>
            </div>
            <div className="distance">
                <div>{props.distance}</div>
                <div className="quip">{distanceQuip(props.distance)}</div>
            </div>
        </div>
    );
};

export default Output;