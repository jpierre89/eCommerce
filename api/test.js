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

    it('POST user "John"', (done) => {
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

    it('POST another user "Jill"', (done) => {
        request(app)
            .post(URI)
            .set('Content-Type', 'application/json')
            .send({
                email: 'jf1000@gmail.com',
                firstName: 'Jill',
                lastName: 'Francis'})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.email).to.equal('jf1000@gmail.com');
                expect(res.body.firstName).to.equal('Jill');
                expect(res.body.lastName).to.equal('Francis');
                expect(res.body.id).to.equal(1);
                done();
            });
    });

    it('PUT user by id 0', (done) => {
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

    it('DELETE user "Jill"', (done) => {
        request(app)
            .delete(URI)
            .set('Content-Type', 'application/json')
            .query({userId: 1})
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.email).to.equal('jf1000@gmail.com');
                expect(res.body.firstName).to.equal('Jill');
                expect(res.body.lastName).to.equal('Francis');
                expect(res.body.id).to.equal(1);
                done();
            });
    });
});


describe(PATH.concat('/storeItem'), () => {
    let URI = PATH.concat('/storeItem');

    it('POST item "Apple2"', (done) => {
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

    it('POST another item "Orange"', (done) => {
        request(app)
            .post(URI)
            .set('Content-Type', 'application/json')
            .send({
                name: 'Orange',
                price: 0.35})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.name).to.equal('Orange');
                expect(res.body.price).to.equal(0.35);
                expect(res.body.id).to.equal(1);
                done();
            });
    });

    it('PUT item by id 0', (done) => {
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

    it('GET item by Id 0', (done) => {
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

    it('DELETE item by id 1', (done) => {
        request(app)
            .delete(URI)
            .set('Content-Type', 'application/json')
            .query({ itemId: 1 })
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.name).to.equal('Orange');
                expect(res.body.price).to.equal(0.35);
                expect(res.body.id).to.equal(1);
                done();
            });
    });    
});


describe(PATH.concat('/cart'), () => {
    let URI = PATH.concat('/cart');

    it('POST storeItem to cart', (done) => {
        request(app)
            .post(URI)
            .set('Content-Type', 'application/json')
            .query({cartId: 0, itemId: 0, quantity: 5})
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.name).to.equal('Apple');
                expect(res.body.price).to.equal(0.25);
                expect(res.body.quantity).to.equal(5);
                expect(res.body.id).to.equal(0);
                done();
            });
    });

    it('GET cart', (done) => {
        request(app)
            .get(URI)
            .set('Content-Type', 'application/json')
            .query({cartId: 0})
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.id).to.equal(0);
                expect(res.body.userId).to.equal(0);
                expect(res.body.cartItems.length).to.equal(5);
                done();
            });
    });

    it('DELETE storeItem from cart', (done) => {
        request(app)
            .delete(URI)
            .set('Content-Type', 'application/json')
            .query({cartId: 0, itemId: 0, quantity: 2})
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { console.log(res.body["error"]); return done(err); }
                expect(res.body.name).to.equal('Apple');
                expect(res.body.price).to.equal(0.25);
                expect(res.body.id).to.equal(0);
                expect(res.body.quantity).to.equal(2);
                done();
            });
    });

    it('DELETE all items from cart', (done) => {
        request(app)
            .delete(URI)
            .set('Content-Type', 'application/json')
            .query({cartId: 0 })
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.length == 3)
                done();
            });
    });

});
