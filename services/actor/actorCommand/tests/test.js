const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should()
const server = require('../src/app');

chai.use(chaiHttp)



describe('routes : actor', () => {
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

    describe('Test group : POST /actor', () => {

        it('[/create] empty', (done) => {
            chai.request(server)
                .post('/actor/create')
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
                .post('/actor/create')
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
                .post('/actor/create')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    errorName: "Michel",
                    type: "Person",
                    id: "https://social.example/alyssa/",
                    name: "Alyssa P. Hacker",
                    preferredUsername: "alyssa",

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
                .post('/actor/update')
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
                .post('/actor/update')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    id: "https://social.example/alyssa/"
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
                .post('/actor/update')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({

                    id: "https://social.example/alyssa/",
                    wrong: "fjvbcs",

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
                .post('/actor/delete')
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


        it('[/delete] incorrect names', (done) => {
            chai.request(server)
                .post('/actor/delete')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({

                    wrong: "https://social.example/alyssa/"

                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(500)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("error");
                    done();
                });
        });



    });

})




