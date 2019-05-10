const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should()
const server = require('../../src/app');

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

    describe('Test group : POST /user', () => {

        it('[/create] empty', (done) => {
            chai.request(server)
                .post('/user/create')
                .set('content-type', 'application/json')
                .send({

                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(500)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("error");
                    done();
                });
        });

        it('[/create] missing fields', (done) => {
            chai.request(server)
                .post('/user/create')
                .set('content-type', 'application/json')
                .send({
                    username: "Michel",
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(500)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("error");
                    done();
                });
        });

        it('[/create] incorrect fields', (done) => {
            chai.request(server)
                .post('/user/create')
                .set('content-type', 'application/json')
                .send({
                    username:"Michel",
                    type:"Person"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(500)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("error");
                    done();
                });
        });

        it('[/create] valid creation', (done) => {
            chai.request(server)
                .post('/user/create')
                .set('content-type', 'application/json')
                .send({
                    username:"Jean",
                    password:"motdepasse"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("success");
                    done();
                });
        });

    });

})




