const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should()
const server = require('../src/app');

chai.use(chaiHttp)



describe('routes : share', () => {
    var date;

    // Called once before each of the tests in this share.
    beforeEach(function() {
        date = new Date();
    });

    // Called after all of the tests in this share complete.
    after(function() {
        console.log("Our application tests done!");
    });

    // Called once after each of the tests in this share.
    afterEach(function() {
        console.log("The date for that one was", date);
    });

    describe('Test group : POST /share', () => {

        it('[/create] empty', (done) => {
            chai.request(server)
                .post('/shareIB/create')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
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
                .post('/shareIB/create')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    user: "Michel",
                    type: "Person"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(500)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("error");
                    done();
                });
        });

        it('[/create] incorrect names', (done) => {
            chai.request(server)
                .post('/shareIB/create')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    "@context": "https://www.w3.org/ns/activitystreams",
                    somarie: "Sally shares John",
                    type: "Relationship",
                    id : "Rel1456",
                    suect: "Sally",
                    relationship: "Share",
                    obct: "John"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(500)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("error");
                    done();
                });
        });


        it('[/undo] empty', (done) => {
            chai.request(server)
                .post('/shareIB/undo')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
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

        it('[/undo] missing fields', (done) => {
            chai.request(server)
                .post('/shareIB/undo')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    user: "Michel",
                    type: "Person"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(500)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("error");
                    done();
                });
        });

        it('[/undo] incorrect names', (done) => {
            chai.request(server)
                .post('/shareIB/undo')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    "@context": "https://www.w3.org/ns/activitystreams",
                    somarie: "Sally shares John",
                    type: "Relationship",
                    odd : "Rel1456",
                    suect: "Sally",
                    relationship: "Share",
                    obct: "John"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(500)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("error");
                    done();
                });
        });


    })
});




