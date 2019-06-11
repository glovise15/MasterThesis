const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should()
const server = require('../src/app');

chai.use(chaiHttp)



describe('routes : user', () => {
    var date;

    // Called once before each of the tests in this block.
    beforeEach(function() {
        date = new Date();
    });

    // Called after all of the tests in this block complete.
    after(function() {
        console.log("Our application tests done!");
    });

    // Called once after each of the tests in this block.
    afterEach(function() {
        console.log("The date for that one was", date);
    });

    describe('POST /user', () => {
        it('should get the userCommand service', (done) => {
            chai.request(server)
                .get('/user')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(404)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("error");
                    res.body.message.should.eql("The user command service does not have this API call")
                    done();
                });
        });
    });

})




