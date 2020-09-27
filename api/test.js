const { create } = require('./app');
const request = require('supertest');


describe('Application Testing', function() {
    
    before(function(done) {
        app = create();
        app.listen(
            function(err) {
                if (err) { return done(err); }
                done();
            }
        );
    });

    it('Should get base url', function() {
        request(app)
            .get('/api')
            .set('Content-Type', 'application/json')
            .expect(200)
    });
    
});