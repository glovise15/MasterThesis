const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should()
const server = require('../../src/app');

const BASE = "http://localhost:3103"

chai.use(chaiHttp)



describe('routes : note', () => {
    var date;

    // Called once before each of the tests in this block.
    beforeEach(function() {
        date = new Date();
    });

    // Called after all of the tests in this block complete.
    after(function() {
        console.log("Our applicationa tests done!");
    });

    // Called once after each of the tests in this block.
    afterEach(function() {
        console.log("The date for that one was", date);
    });

    describe('GET /note', () => {
        it('should get the note service', (done) => {
            chai.request(server)
                .get('/note')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('success, service note');
                    done();
                });
        });
    });

})




