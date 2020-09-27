const { create } = require('./app');
const request = require('supertest');
const { expect, assert } = require('chai');

PATH = '/api';

describe(PATH, () => {
    URI = PATH;
    
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
    URI = PATH.concat('/user');
    
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

    it('GET', (done) => {
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
    STORE_ITEM_URI = PATH.concat('/storeItem');
    
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
            .post(STORE_ITEM_URI)
            .set('Content-Type', 'application/json')
            .query({
                name: 'Apple'})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.name).to.equal('Apple');
                expect(res.body.id).to.equal(1);
                done();
            });
    });
});
