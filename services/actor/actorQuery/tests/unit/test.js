const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should()
const server = require('../../src/app');

chai.use(chaiHttp)



describe('routes : actor', () => {
    var date;

    before(function(){})
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

    describe('Test group : GET /actor', () => {

        it('[/create] valid creation', (done) => {
            chai.request(server)
                .post('/actor/create')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    user: "Michel",
                    type: "Person",
                    id: "Alyssa",
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

            chai.request(server)
                .post('/actor/create')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    user: "Michel",
                    type: "Person",
                    id: "Alfonse",
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

            chai.request(server)
                .post('/actor/create')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .send({
                    user: "Luc",
                    type: "Person",
                    id: "Claude",
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

        it('[/getAll] user does not exit', (done) => {
            chai.request(server)
                .post('/actor/getAll/ABC')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(500)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("error");
                    done();
                });
        });

        it('[/getAll] valid getAll', (done) => {
            chai.request(server)
                .post('/actor/getAll/Michel')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("success");
                    Object.keys(res.body.data.docs).length.should.equal(2)
                    done();
                });
        });


        it('[/get] actor does not exit', (done) => {
            chai.request(server)
                .post('/actor/get/ABC')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(500)
                    res.type.should.equal('application/json');
                    res.body.status.should.eql("error");
                    done();
                });
        });

        it('[/get] valid get', (done) => {
            chai.request(server)
                .post('/actor/get/Claude')
                .set('content-type', 'application/json')
                .set('Authorization', 'bearer xxx')
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




