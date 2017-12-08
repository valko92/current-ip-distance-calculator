module.exports = function(origin, destination, callback) {
    var request = require('request-promise');
    var bluebird = require('bluebird');

    var output = [];
    const inputOrigin = {"query":"{\n\tgetLocation(ip: \""+origin+"\") {\n\t\tlocation {\n\t\t\tlatitude\n\t\t\tlongitude\n\t\t}\n\t}\n}"}
    const inputDestination = {"query":"{\n\tgetLocation(ip: \""+destination+"\") {\n\t\tlocation {\n\t\t\tlatitude\n\t\t\tlongitude\n\t\t}\n\t}\n}"}
    
    const requestOrigin =  request({
        method: "POST",
        json: true,
        body: inputOrigin,
        url: `https://api.graphloc.com/graphql`,
        headers: {'Content-Type': 'application/json'}
    });
    const requestDestination = request({
        method: "POST",
        json: true,
        body: inputDestination,
        url: `https://api.graphloc.com/graphql`,
        headers: {'Content-Type': 'application/json'}
    });
    
    // combine Origin and Destination requests
    bluebird.all([requestOrigin, requestDestination])
        .spread(function (originRes, destinationRes) {
            const latLongOrigin = originRes.data.getLocation.location;
            const latLongDest = destinationRes.data.getLocation.location;

            // request distance after getting lat and long
            
            const o =  latLongOrigin.latitude+","+latLongOrigin.longitude;
            const d =  latLongDest.latitude+","+latLongDest.longitude;
            const k = process.env.key;

            console.log(`https://maps.googleapis.com/maps/api/directions/json?origin=${o}&destination=${d}&key=${k}`);

            request(`https://maps.googleapis.com/maps/api/directions/json?origin=${o}&destination=${d}&key=${k}`)
            .then(function(response) {
                // same schema as dummy.json
                output = {
                        "origin": JSON.parse(response).routes[0].legs[0].start_address,
                        "destination": JSON.parse(response).routes[0].legs[0].end_address,
                        "distance": JSON.parse(response).routes[0].legs[0].duration.text
                }
                callback(output);
            })
            .catch(function (err) {
                console.log(`error getting dist: ${err}`);
                callback(err);
            });
        })
        .catch(function (err) {
            console.log(`error getting lat and long: ${err}`);
            callback(err);
        });
};