const { Router } = require("express")
const router = Router()
const Serie = require("../models/serie")

router.get("/", async (req, res) => {
  const series = await Serie.find({})

  res.send(series)
})

router.post("/", async (req, res) => {
  const serie = new Serie(req.body)
  try {
    await serie.save()
    res.json(serie)
  } catch (error) {
    res.send({
      success: false,
      erros: Object.keys(error.errors)
    })
  }
})

router.delete("/:id", async (req, res) => {
  await Serie.remove({ _id: req.params.id })
  res.send({
    success: true
  })
})

router.get("/:id", async (req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  res.json(serie)
})

router.put("/:id", async (req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  const { name, status, comments } = req.body

  serie.name = name
  serie.status = status

  try {
    await serie.save()
    res.json(serie)
  } catch (e) {
    res.send({
      success: false,
      erros: e
    })
  }
})

module.exports = router
