const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should()
const server = require('../../src/app');

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
                    res.body.should.have.property("message"),
                    res.body.message.should.eql("Fields required : user, type, id, name, preferredUsername, summary, inbox, outbox, followers, following, liked"),
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
                    res.body.should.have.property("message"),
                    res.body.message.should.eql("Fields required : user, type, id, name, preferredUsername, summary, inbox, outbox, followers, following, liked")
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
                    summary: "Lisp enthusiast hailing from MIT",
                    inbox: "https://social.example/alyssa/inbox/",
                    outbox: "https://social.example/alyssa/outbox/",
                    followers: "https://social.example/alyssa/followers/",
                    following: "https://social.example/alyssa/following/",
                    liked: "https://social.example/alyssa/liked/"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(500)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("error");
                    res.body.should.have.property("message"),
                        res.body.message.should.eql("Fields required : user, type, id, name, preferredUsername, summary, inbox, outbox, followers, following, liked")
                    done();
                });
        });

        it('[/create] valid creation', (done) => {
            chai.request(server)
                .post('/actor/create')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    user: "Michel",
                    type: "Person",
                    id: "https://social.example/alyssa/",
                    name: "Alyssa P. Hacker",
                    preferredUsername: "jeanclaude",
                    summary: "Lisp enthusiast hailing from MIT",
                    inbox: "https://social.example/alyssa/inbox/",
                    outbox: "https://social.example/alyssa/outbox/",
                    followers: "https://social.example/alyssa/followers/",
                    following: "https://social.example/alyssa/following/",
                    liked: "https://social.example/alyssa/liked/"
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




