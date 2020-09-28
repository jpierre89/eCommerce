const { create } = require('./app');
const request = require('supertest');
const { expect, assert } = require('chai');

PATH = '/api';

describe(PATH, () => {
    let URI = PATH;
    
    before((done) => {
        app = create();
        app.listen((err) => {
            if (err) { return done(err); }
            done();
        });
    });

    beforeEach(() => {});
    after(() => {});
    afterEach(() => {});

    it('GET', (done) => {
        request(app)
            .get('/api')
            .set('Content-Type', 'application/json')
            .expect(200, done);
    });
    
});

describe(PATH.concat('/user'), () => {
    let URI = PATH.concat('/user');
    
    before((done) => {
        app = create();
        app.listen((err) => {
            if (err) { return done(err); }
            done();
        });
    });

    beforeEach(() => {});
    after(() => {});
    afterEach(() => {});

    it('POST', (done) => {
        request(app)
            .post(URI)
            .set('Content-Type', 'application/json')
            .send({
                username: 'jp2',
                firstName: 'John',
                lastName: 'Forrest'})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.username).to.equal('jp2');
                expect(res.body.firstName).to.equal('John');
                expect(res.body.lastName).to.equal('Forrest');
                done();
            });
    });

    it('PUT', (done) => {
        request(app)
            .put(URI)
            .set('Content-Type', 'application/json')
            .send({
                username: 'jp2',
                newUsername: 'jp',
                firstName: 'Jon',
                lastName: 'Pierre'})
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.username).to.equal('jp');
                expect(res.body.firstName).to.equal('Jon');
                expect(res.body.lastName).to.equal('Pierre');
                done();
            });
    });

    it('GET by Id', (done) => {
        request(app)
            .get(URI)
            .set('Content-Type', 'application/json')
            .query({
                username: 'jp'})
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.username).to.equal('jp');
                expect(res.body.firstName).to.equal('Jon');
                expect(res.body.lastName).to.equal('Pierre');
                done();
            });
    });

    it('GET list', (done) => {
        request(app)
            .get(URI)
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('DELETE', (done) => {
        request(app)
            .delete(URI)
            .set('Content-Type', 'application/json')
            .query({
                username: 'jp'})
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.username).to.equal('jp');
                expect(res.body.firstName).to.equal('Jon');
                expect(res.body.lastName).to.equal('Pierre');
                done();
            });
    });
});


describe(PATH.concat('/storeItem'), () => {
    let URI = PATH.concat('/storeItem');
    
    before((done) => {
        app = create();
        app.listen((err) => {
            if (err) { return done(err); }
            done();
        });
    });

    beforeEach(() => {});
    after(() => {});
    afterEach(() => {});

    it('POST', (done) => {
        request(app)
            .post(URI)
            .set('Content-Type', 'application/json')
            .send({
                name: 'Apple2'})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.name).to.equal('Apple2');
                expect(res.body.id).to.equal(1);
                done();
            });
    });

    
    it('PUT', (done) => {
        request(app)
            .put(URI)
            .set('Content-Type', 'application/json')
            .send({
                id: 1,
                name: 'Apple'})
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.name).to.equal('Apple');
                expect(res.body.id).to.equal(1);
                done();
            });
    });

    it('GET by Id', (done) => {
        request(app)
            .get(URI)
            .set('Content-Type', 'application/json')
            .query({id: 1})
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.name).to.equal('Apple');
                expect(res.body.id).to.equal(1);
                done();
            });
    });

    it('GET by query', (done) => {
        request(app)
            .get(URI)
            .set('Content-Type', 'application/json')
            .query({expr: 'pp'})
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body[0].name).to.equal('Apple');
                expect(res.body[0].id).to.equal(1);
                done();
            });
    });


    it('GET list', (done) => {
        request(app)
            .get(URI)
            .set('Content-Type', 'application/json')
            .expect(200, done);
    });

    it('DELETE by Id', (done) => {
        request(app)
            .delete(URI)
            .set('Content-Type', 'application/json')
            .query({ id: 1 })
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.name).to.equal('Apple');
                expect(res.body.id).to.equal(1);
                done();
            });
    });    
});
