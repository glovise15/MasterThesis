const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should()
const server = require('../../src/app');

chai.use(chaiHttp)



describe('routes : follow', () => {
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

    describe('Test group : POST /follow', () => {

        it('[/create] empty', (done) => {
            chai.request(server)
                .post('/follow/create')
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
                .post('/follow/create')
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
                .post('/follow/create')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    "@context": "https://www.w3.org/ns/activitystreams",
                    somarie: "Sally follows John",
                    type: "Relationship",
                    id : "Rel1456",
                    suect: "Sally",
                    relationship: "Follow",
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

        it('[/create] valid creation', (done) => {
            chai.request(server)
                .post('/follow/create')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    "@context": "https://www.w3.org/ns/activitystreams",
                    summary: "Sally follows John",
                    type: "Relationship",
                    id : "Rel1456",
                    subject: "Sally",
                    relationship: "Follow",
                    object: "John"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("success");
                    done();
                });
        });

        it('[/remove] empty', (done) => {
            chai.request(server)
                .post('/follow/remove')
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

        it('[/remove] missing fields', (done) => {
            chai.request(server)
                .post('/follow/remove')
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

        it('[/remove] incorrect names', (done) => {
            chai.request(server)
                .post('/follow/remove')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    "@context": "https://www.w3.org/ns/activitystreams",
                    somarie: "Sally follows John",
                    type: "Relationship",
                    odd : "Rel1456",
                    suect: "Sally",
                    relationship: "Follow",
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

        it('[/remove] valid creation', (done) => {
            chai.request(server)
                .post('/follow/remove')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    "@context": "https://www.w3.org/ns/activitystreams",
                    summary: "Sally follows John",
                    type: "Relationship",
                    id : "Rel1456",
                    subject: "Sally",
                    relationship: "Follow",
                    object: "John"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("success");
                    done();
                });
        });

        it('[/accept] empty', (done) => {
            chai.request(server)
                .post('/follow/accept')
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

        it('[/accept] missing fields', (done) => {
            chai.request(server)
                .post('/follow/accept')
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

        it('[/accept] incorrect names', (done) => {
            chai.request(server)
                .post('/follow/accept')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    "@context": "https://www.w3.org/ns/activitystreams",
                    somarie: "Sally follows John",
                    type: "Relationship",
                    id : "Rel1456",
                    suect: "Sally",
                    relationship: "Follow",
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

        it('[/accept] valid creation', (done) => {
            chai.request(server)
                .post('/follow/accept')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    "@context": "https://www.w3.org/ns/activitystreams",
                    summary: "Sally follows John",
                    type: "Relationship",
                    id : "Rel1456",
                    subject: "Sally",
                    relationship: "Follow",
                    object: "John"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("success");
                    done();
                });
        });

        it('[/reject] empty', (done) => {
            chai.request(server)
                .post('/follow/reject')
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

        it('[/reject] missing fields', (done) => {
            chai.request(server)
                .post('/follow/reject')
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

        it('[/reject] incorrect names', (done) => {
            chai.request(server)
                .post('/follow/reject')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    "@context": "https://www.w3.org/ns/activitystreams",
                    somarie: "Sally follows John",
                    type: "Relationship",
                    id : "Rel1456",
                    suect: "Sally",
                    relationship: "Follow",
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

        it('[/reject] valid creation', (done) => {
            chai.request(server)
                .post('/follow/reject')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    "@context": "https://www.w3.org/ns/activitystreams",
                    summary: "Sally follows John",
                    type: "Relationship",
                    id : "Rel1456",
                    subject: "Sally",
                    relationship: "Follow",
                    object: "John"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("success");
                    done();
                });
        });

    })
});




