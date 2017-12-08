import React from 'react';
import '../styles/Output.css';

const distanceQuip= dist => {
    let distParsed = dist.split(' min')[0];
    let numDist = parseInt(distParsed, 10);
    let quip = '';

    switch(true) {
        case numDist > 120:
            quip = 'Damn, that\'s far.';
            break;
        case numDist > 30:
            quip = 'Not too far.';
            break;
        default:
            quip = 'Well, that ain\'t far';
            break;
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