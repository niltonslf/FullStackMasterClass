const request = require("supertest")
const expect = require("chai").expect

const mongoose = require("mongoose")
const mongo =
  "mongodb://localhost:27017/test-series?retryWrites=true&w=majority"
mongoose.Promise = global.Promise

const app = require("../app")

const User = require("../models/user")
const Serie = require("../models/serie")

describe("Testing Rest API", () => {
  before("Connection to mongodb", async () => {
    await mongoose.connect(mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    // Remover todos os usuários
    await User.deleteMany({})

    // Criar um usuário de teste
    const user = new User({
      username: "niltonslf",
      password: 123456,
      roles: ["admin", "restrito"]
    })
    await user.save()
    await Serie.deleteMany({})
    return true
  })

  it("should return an error to series ", done => {
    request(app)
      .get("/series")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(err).be.null
        expect(res.body.success).be.false
        done()
      })
  })

  it("should auth an user", done => {
    request(app)
      .post("/auth")
      .send({
        username: "niltonslf",
        password: 123456
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(err).be.null
        userToken = res.body.token
        expect(res.body.token).be.string
        done()
      })
  })

  it("Should not auth an user", done => {
    request(app)
      .post("/auth")
      .send({})
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(err).be.null
        expect(res.body.message).be.string
        done()
      })
  })

  describe("auth as admin", () => {
    let token = ""
    before("get token", done => {
      request(app)
        .post("/auth")
        .send({ username: "niltonslf", password: 123456 })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).be.null
          userToken = res.body.token
          token = res.body.token
          done()
        })
    })

    it("Should return no series", done => {
      request(app)
        .get("/series")
        .set("x-access-token", token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).be.null
          expect(res.body).be.empty
          done()
        })
    })

    it("sould return a new series", done => {
      request(app)
        .post("/series")
        .set("x-access-token", token)
        .send({ name: "Minha serie", status: "to-watch" })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).be.null
          expect(res.body).not.empty
          done()
        })
    })

    it("Should return a series", done => {
      request(app)
        .get("/series")
        .set("x-access-token", token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).be.null
          expect(res.body).not.empty
          done()
        })
    })
  })
})
