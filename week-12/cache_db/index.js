const express = require("express")
const redis = require("redis")
const mongoose = require("mongoose")

const Serie = require("./models/serie")

const app = express()
const mongo =
  "mongodb://localhost:27017/test-series?retryWrites=true&w=majority"

const redisClient = redis.createClient({})

const getCache = key => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if (err) return reject(err)
      return resolve(value)
    })
  })
}

const setCache = (key, value) => {
  return new Promise((resolve, reject) => {
    redisClient.set(key, JSON.stringify(value), "EX", 10, err => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

app.get("/", async (req, res) => {
  const seriesCache = await getCache("series")

  if (!seriesCache) {
    console.log("CACHE MISS")

    const series = await Serie.find({})
    setCache("series", series)
    res.send(series)
  } else {
    console.log("CACHE HIT")
    res.send(JSON.parse(seriesCache))
  }
})

mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3333, () => console.log("listening..."))
  })
