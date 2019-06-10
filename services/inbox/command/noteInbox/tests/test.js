const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should()
const server = require('../src/app');

chai.use(chaiHttp)



describe('routes : note', () => {
    var date;

    // Called once before each of the tests in this block.
    beforeEach(function() {
        date = new Date();
    });

    // Called after all of the tests in this block complete.
    after(function() {
        console.log("Our application tests are done!");
    });

    // Called once after each of the tests in this block.
    afterEach(function() {
        console.log("The date for that one was", date);
    });

    describe('Test group : POST /note', () => {

        it('[/create] empty', (done) => {
            chai.request(server)
                .post('/noteIB/create')
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
                .post('/noteIB/create')
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
                .post('/noteIB/create')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    "@context": "https://www.w3.org/ns/activitystreams",
                    somarie: "Sally writes a note",
                    type: "Create",
                    id : "Rel1456",
                    suect: "Sally",
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


        it('[/update] empty', (done) => {
            chai.request(server)
                .post('/noteIB/update')
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

        it('[/update] missing fields', (done) => {
            chai.request(server)
                .post('/noteIB/update')
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

        it('[/update] incorrect names', (done) => {
            chai.request(server)
                .post('/noteIB/update')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    "@context": "https://www.w3.org/ns/activitystreams",
                    somarie: "Sally writes a note",
                    type: "Create",
                    id : "Rel1456",
                    suect: "Sally",
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

        it('[/delete] empty', (done) => {
            chai.request(server)
                .post('/noteIB/delete')
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

        it('[/delete] missing fields', (done) => {
            chai.request(server)
                .post('/noteIB/delete')
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

        it('[/delete] incorrect names', (done) => {
            chai.request(server)
                .post('/noteIB/delete')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    "@context": "https://www.w3.org/ns/activitystreams",
                    somarie: "Sally writes a note",
                    type: "Create",
                    id : "Rel1456",
                    suect: "Sally",
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




