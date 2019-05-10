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

    describe('Test group : GET /user', () => {

        it(' create mock user for query tests', (done) => {
            chai.request(server)
                .post('/user/create')
                .set('content-type', 'application/json')
                .send({
                    username:"Mike",
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


        it('[/authenticate] user not in DB', (done) => {
            chai.request(server)
                .get('/user/authenticate/Maxime/abc')
                .set('content-type', 'application/json')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(500)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("error");
                    done();
                });
        });

        it('[/authenticate] wrong password', (done) => {
            chai.request(server)
                .get('/user/authenticate/Mike/abc')
                .set('content-type', 'application/json')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(500)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("error");
                    done();
                });
        });

        it('[/authenticate/Mike/motdepasse] valid authentication', (done) => {
            chai.request(server)
                .get('/user/authenticate/Mike/motdepasse')
                .set('content-type', 'application/json')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("success");
                    res.body.should.have.property("token");
                    done();
                });
        });


        it('[/authorization] wrong token', (done) => {
            chai.request(server)
                .get('/user/authorization/Mike/abc')
                .set('content-type', 'application/json')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(500)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("error");
                    done();
                });
        });

        it('[/authorization/Mike/token] valid token verification', (done) => {
            chai.request(server)
                .get('/user/authorization/Mike/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTcyMjk1OTksImV4cCI6MTU1NzgzNDM5OX0.kP9cYceBwoQLUxb22n_GDpRZDebSkY_YRxTjKRpK9Yg')
                .set('content-type', 'application/json')
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




