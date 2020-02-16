const request = require("supertest")
const expect = require("chai").expect

const mongoose = require("mongoose")
const mongo =
  "mongodb+srv://niltonslf:mongo123@cluster0-hakdt.mongodb.net/test-series?retryWrites=true&w=majority"
const User = require("../models/user")

const app = require("../app")

describe("Testing Rest API", () => {
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
})

describe("Testing /auth", () => {
  mongoose
    .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      // Remover todos os usuários
      User.collection.deleteMany({})

      // Criar um usuário de teste
      const user = new User({
        username: "niltonslf",
        password: 123456,
        roles: ["admin"]
      })

      user.save()
    })

  it("shoud retun an auth token", done => {
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
        expect(res.body.token).be.string
        done()
      })
  })
})
