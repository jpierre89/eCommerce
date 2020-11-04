const request = require('supertest');
const { expect, assert } = require('chai');
const { init_app } = require('./app');
const userController = require('./controllers/user');
const storeItemController = require('./controllers/storeItem');
const cartController = require('./controllers/cart');


const PATH = '/api'; // The base path for all routes
let app; // express app

// Executed once before all tests
before( async () => {
    app = await init_app(env="testing");
});

// Executed once after all tests
after(() => {
    process.exit();
})


describe(PATH, () => {
    let URI = PATH;
    
    after(() => {});
    afterEach(() => {});

    it('GET: api route information', function(done) {
        request(app)
            .get(URI)
            .set('Content-Type', 'application/json')
            .expect(200);
            done()
    });
    
});

describe(PATH.concat('/user'), () => {
    let URI = PATH.concat('/user');

    it('Login', function(done) {
        userController.createUser('jon99@gmail.com', 'password', 'jon',  'pierre')
        .then((user) => {
            request(app)
                .post(URI.concat('/login'))
                .set('Content-Type', 'application/json')
                .send({
                    email: 'jon99@gmail.com',
                    password: 'password'})
                .expect('Content-Type', /json/)
                .expect(200, (err, res) => {
                    if (err) { return done(err); }
                    done()
                });
        });
    });

    it('POST: create new user "John"', function(done) {
        request(app)
            .post(URI)
            .set('Content-Type', 'application/json')
            .send({
                email: 'jp2@gmail.com',
                password: 'password',
                firstName: 'John',
                lastName: 'Forrest'})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.email).to.equal('jp2@gmail.com');
                expect(res.body.firstName).to.equal('John');
                expect(res.body.lastName).to.equal('Forrest');
                done()
            });
    });

    it('PUT: update existing user', function(done) {
        userController.createUser('jon@gmail.com,', 'password', 'jon',  'pierre')
            .then((user) => {
                request(app)
                .put(URI)
                .set('Content-Type', 'application/json')
                .query({'id': String(user._id)})
                .send({
                    email: 'jon@yahoo.com',
                    password: 'password',
                    firstName: 'Jon',
                    lastName: 'Pierre'})
                .expect('Content-Type', /json/)
                .expect(200, (err, res) => {
                    if (err) { return done(err); }
                    expect(res.body.email).to.equal('jon@yahoo.com');
                    expect(res.body.firstName).to.equal('Jon');
                    expect(res.body.lastName).to.equal('Pierre');
                    done();
                });
            })
            .catch((err) => done(err));
    });

    it('GET: return user by id', function(done) {
        userController.createUser('jon3@gmail.com', 'password', 'jon',  'pierre')
            .then((user) => {
                request(app)
                .get(URI)
                .set('Content-Type', 'application/json')
                .query({'id': String(user._id)})
                .expect('Content-Type', /json/)
                .expect(200, (err, res) => {
                    if (err) { return done(err); }
                    expect(res.body.email).to.equal('jon3@gmail.com');
                    expect(res.body.firstName).to.equal('jon');
                    expect(res.body.lastName).to.equal('pierre');
                    done();
                });
            })
            .catch((err) => done(err));
    });

    it('GET: return all users list', function(done) {
        request(app)
            .get(URI)
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                done();
            });
    });

    it('DELETE: delete user', function(done) {
        userController.createUser('jon44@gmail.com', 'password', 'jon',  'pierre')
            .then((user) => {
                request(app)
                .delete(URI)
                .set('Content-Type', 'application/json')
                .query({id: String(user._id)})
                .expect('Content-Type', /json/)
                .expect(200, (err, res) => {
                    if (err) { return done(err); }
                    expect(res.body.email).to.equal('jon44@gmail.com');
                    done();
                });
            })
            .catch((err) => done(err));
    });
});


describe(PATH.concat('/storeItem'), () => {
    let URI = PATH.concat('/storeItem');

    it('POST: create new StoreItem', function(done) {
        request(app)
            .post(URI)
            .set('Content-Type', 'application/json')
            .send({
                name: 'Apple',
                price: 0.20})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                if (err) { return done(err); }
                expect(res.body.name).to.equal('Apple');
                expect(res.body.price).to.equal(0.20);
                done();
            });
    });

    it('PUT: update a StoreItem', function(done) {
        storeItemController.createStoreItem('Orange', 0.25)
            .then((item) => {
                request(app)
                .put(URI)
                .set('Content-Type', 'application/json')
                .query({id: String(item._id)})
                .send({
                    name: 'RipeOrange',
                    price: 0.10})
                .expect('Content-Type', /json/)
                .expect(200, (err, res) => {
                    if (err) { return done(err); }
                    expect(res.body.name).to.equal('RipeOrange');
                    expect(res.body.price).to.equal(0.1);
                    done();
                });
            })
            .catch((err) => done(err));


    });

    it('GET: return StoreItem by id', function(done) {
        storeItemController.createStoreItem('Pear', 0.50)
            .then((item) => {
                request(app)
                .get(URI)
                .set('Content-Type', 'application/json')
                .query({id: String(item._id)})
                .expect('Content-Type', /json/)
                .expect(200, (err, res) => {
                    if (err) { return done(err); }
                    expect(res.body.name).to.equal('Pear');
                    done();
                });
            })
            .catch((err) => done(err));
    });

    it('GET: return all StoreItems that match expression', function(done) {
        storeItemController.createStoreItem('Banana', 0.25)
            .then((item) => {
                request(app)
                .get(URI)
                .set('Content-Type', 'application/json')
                .query({expr: 'anana'})
                .expect(200, (err, res) => {
                    if (err) { return done(err); }
                    expect(res.body[0].name).to.equal('Banana');
                    done();
                });
            })
            .catch((err) => done(err));
    });

    it('GET: return all StoreItems as list', function(done) {
        request(app)
            .get(URI)
            .set('Content-Type', 'application/json')
            .expect(200, (err, res) => {
                if (err) { return done(err); }
                done();
            });
    });

    it('GET: recent Store Items viewed for the session', function(done) {
        storeItemController.createStoreItem('Strawberry', 0.15)
            .then((item) => {
   
                // Get Store Item
                request(app)
                    .get(URI)
                    .set('Content-Type', 'application/json')
                    .query({id: String(item._id)})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then(function() {
                        // Next, Get the Store Items Viewed
                        request(app)
                            .get(URI)
                            .set('Content-Type', 'application/json')
                            .query({recent: 5})
                            .expect('Content-Type', /json/)
                            .expect(200, (err, res) => {
                                if (err) { return done(err); }                           
                                done();
                            });
                    });

                })
                .catch((err) => done(err));
            
    });

    it('DELETE: delete StoreItem', function(done) {
        storeItemController.createStoreItem('Melon', 1.00)
            .then((item) => {
                request(app)
                .delete(URI)
                .set('Content-Type', 'application/json')
                .query({ id: String(item._id) })
                .expect(200, (err, res) => {
                    if (err) { return done(err); }
                    expect(res.body.name).to.equal('Melon');
                    done();
                });
            })
            .catch((err) => done(err));
    });    
});


describe(PATH.concat('/cart'), () => {
    let URI = PATH.concat('/cart');

    it("POST: add a new storeItem to a user's cart", function(done) {
        userController.createUser("jp113", "password", "jon", "pierre")
            .then((user) => {
                storeItemController.createStoreItem("Leaf", .05)
                    .then((item) => {
                        request(app)
                        .post(URI)
                        .set('Content-Type', 'application/json')
                        .query(
                            {
                                userId: String(user._id),
                                storeItemId: String(item._id),
                                quantity: 5
                            }
                        )
                        .expect('Content-Type', /json/)
                        .expect(201, (err, res) => {
                            if (err) { return done(err); }
                            expect(String(res.body.storeItem._id)).to.equal(String(item._id));
                            expect(res.body.quantity).to.equal(5);
                            done();
                        });
                    })
                    .catch((err) =>  done(err));
            })
            .catch((err) => done(err));
    });

    it("POST: add an existing cartItem to a user's cart", function(done) {
        userController.createUser("jp1234", "password", "jon", "pierre")
            .then((user) => {
                storeItemController.createStoreItem("Potato", .05)
                    .then((item) => {
                        cartController.addCartItem(String(user._id), String(item._id), 1)
                            .then((cartItem) => {
                                request(app)
                                .post(URI)
                                .set('Content-Type', 'application/json')
                                .query(
                                    {
                                        userId: String(user._id),
                                        storeItemId: String(item._id),
                                        quantity: 5
                                    }
                                )
                                .expect('Content-Type', /json/)
                                .expect(201, (err, res) => {
                                    if (err) { return done(err); }
                                    expect(String(res.body.storeItem._id)).to.equal(String(item._id));
                                    expect(res.body.quantity).to.equal(6);
                                    done();
                                });
                        })
                        .catch((err) =>  done(err));
                    })
                    .catch((err) =>  done(err));
            })
            .catch((err) => done(err));
    });


    it("GET: return CartItem in a user's cart", function(done) {
        userController.createUser("jp5678", "password", "jon", "pierre")
        .then((user) => {
            storeItemController.createStoreItem("Chips", 1.00)
                .then((item) => {
                    cartController.addCartItem(String(user._id), String(item._id), 1)
                        .then((cartItem) => {
                            request(app)
                            .get(URI)
                            .set('Content-Type', 'application/json')
                            .query({userId: String(user._id)})
                            .expect('Content-Type', /json/)
                            .expect(200, (err, res) => {
                                if (err) { return done(err); }
                                expect(res.body[0].storeItem.name).to.equal('Chips');
                                expect(res.body[0].quantity).to.equal(1);
                                done();
                            });
                        })
                        .catch((err) =>  done(err));
                })
                .catch((err) =>  done(err));
        })
        .catch((err) => done(err));
    });

    it("DELETE: delete a quantity of CartItem's from a user's cart", function(done) {
        userController.createUser("jp7777", "password", "jon", "pierre")
        .then((user) => {
            storeItemController.createStoreItem("Starburst", 1.00)
                .then((item) => {
                    cartController.addCartItem(String(user._id), String(item._id), 2)
                        .then((cartItem) => {
                            request(app)
                                .delete(URI)
                                .set('Content-Type', 'application/json')
                                .query(
                                    {   userId: String(user._id),
                                        cartItemId: String(cartItem._id),
                                        quantity: 1
                                    }
                                )
                                .expect('Content-Type', /json/)
                                .expect(200, (err, res) => {
                                    if (err) { return done(err); }
                                    expect(res.body.quantity).to.equal(1);
                                    done();
                                });
                        })
                        .catch((err) =>  done(err));
                })
                .catch((err) =>  done(err));
        })
        .catch((err) => done(err));
    });

    it("DELETE: all items from a user's cart", function(done) {
        userController.createUser("jp8888", "password", "jon", "pierre")
        .then((user) => {
            storeItemController.createStoreItem("Skittles", 1.00)
                .then((item) => {
                    cartController.addCartItem(String(user._id), String(item._id), 5)
                        .then((cartItem) => {
                            request(app)
                                .delete(URI)
                                .set('Content-Type', 'application/json')
                                .query({userId: String(user._id)})
                                .expect('Content-Type', /json/)
                                .expect(200, (err, res) => {
                                    if (err) { return done(err); }
                                    done();
                                });
                        })
                        .catch((err) =>  done(err));
                })
                .catch((err) =>  done(err));
        })
        .catch((err) => done(err)); 
    });

});
