const { create } = require('./app');
const request = require('supertest');
const { expect, assert } = require('chai');
const { User } = require('./models/user');

PATH = '/api';

app = create();


describe(PATH, () => {
    let URI = PATH;
    
    before(() => {});
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

    it('POST user', (done) => {
        request(app)
            .post(URI)
            .set('Content-Type', 'application/json')
            .send({
                email: 'jp2@gmail.com',
                firstName: 'John',
                lastName: 'Forrest'})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.email).to.equal('jp2@gmail.com');
                expect(res.body.firstName).to.equal('John');
                expect(res.body.lastName).to.equal('Forrest');
                expect(res.body.id).to.equal(0);
                done();
            });
    });

    it('PUT user by id', (done) => {
        request(app)
            .put(URI)
            .set('Content-Type', 'application/json')
            .query({'userId': 0})
            .send({
                id: 0,
                email: 'jp@gmail.com',
                firstName: 'Jon',
                lastName: 'Pierre'})
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.email).to.equal('jp@gmail.com');
                expect(res.body.firstName).to.equal('Jon');
                expect(res.body.lastName).to.equal('Pierre');
                expect(res.body.id).to.equal(0);
                done();
            });
    });

    it('GET user by email', (done) => {
        request(app)
            .get(URI)
            .set('Content-Type', 'application/json')
            .query({
                email: 'jp@gmail.com'})
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.email).to.equal('jp@gmail.com');
                expect(res.body.firstName).to.equal('Jon');
                expect(res.body.lastName).to.equal('Pierre');
                expect(res.body.id).to.equal(0);
                done();
            });
    });

    it('GET users list', (done) => {
        request(app)
            .get(URI)
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('DELETE user by id', (done) => {
        request(app)
            .delete(URI)
            .set('Content-Type', 'application/json')
            .query({userId: 0})
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.email).to.equal('jp@gmail.com');
                expect(res.body.firstName).to.equal('Jon');
                expect(res.body.lastName).to.equal('Pierre');
                expect(res.body.id).to.equal(0);
                done();
            });
    });
});


describe(PATH.concat('/storeItem'), () => {
    let URI = PATH.concat('/storeItem');

    it('POST item', (done) => {
        request(app)
            .post(URI)
            .set('Content-Type', 'application/json')
            .send({
                name: 'Apple2',
                price: 0.20})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.name).to.equal('Apple2');
                expect(res.body.price).to.equal(0.20);
                expect(res.body.id).to.equal(0);
                done();
            });
    });

    it('PUT item by id', (done) => {
        request(app)
            .put(URI)
            .set('Content-Type', 'application/json')
            .query({itemId: 0})
            .send({
                id: 0,
                name: 'Apple',
                price: 0.25})
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.name).to.equal('Apple');
                expect(res.body.price).to.equal(0.25);
                expect(res.body.id).to.equal(0);
                done();
            });
    });

    it('GET item by Id', (done) => {
        request(app)
            .get(URI)
            .set('Content-Type', 'application/json')
            .query({itemId: 0})
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.name).to.equal('Apple');
                expect(res.body.price).to.equal(0.25);
                expect(res.body.id).to.equal(0);
                done();
            });
    });

    it('GET item by match', (done) => {
        request(app)
            .get(URI)
            .set('Content-Type', 'application/json')
            .query({expr: 'pp'})
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body[0].name).to.equal('Apple');
                expect(res.body[0].price).to.equal(0.25);
                expect(res.body[0].id).to.equal(0);
                done();
            });
    });

    it('GET item list', (done) => {
        request(app)
            .get(URI)
            .set('Content-Type', 'application/json')
            .expect(200, done);
    });

    it('DELETE item by id', (done) => {
        request(app)
            .delete(URI)
            .set('Content-Type', 'application/json')
            .query({ itemId: 0 })
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.name).to.equal('Apple');
                expect(res.body.price).to.equal(0.25);
                expect(res.body.id).to.equal(0);
                done();
            });
    });    
});
