var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var app = server.app;
var should = chai.should();

chai.use(chaiHttp);

describe('Connect Rest Service', function() {
    it('should return list on get /distance, length of which is greater than 0', function(done) {
        chai.request(server)
        .get('/distance')
        .query({
            origin: "74.105.57.242",
            destination: "74.105.57.242"
        })
        .end(function(error, response, body) {
            console.log(response.body.origin);
            response.body.origin.should.have.string('20-32 Cottage Pl, Montclair, NJ 07042, USA');
            response.body.destination.should.have.string('20-32 Cottage Pl, Montclair, NJ 07042, USA');;
            response.body.distance.should.have.string('1 min');;
            done(body);
        });
    });
});