const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')

describe('Testing Rest API', () => {
  it('should return an error ', done => {
    request(app)
      .get('/series')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(err).be.null
        expect(res.body.success).be.false
        done()
      })
  })
})
