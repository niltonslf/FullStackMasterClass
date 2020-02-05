const { Router } = require('express')
const Serie = require('../models/serie')

const jwt = require('jsonwebtoken')
const jwtSecret = '!@#$%'

const router = Router()

router.use(async (req, res, next) => {
  const token =
    req.headers['x-access-token'] || req.body.token || req.query.token

  if (token) {
    try {
      const payload = jwt.verify(token, jwtSecret)

      if (payload.roles.includes('restrito')) {
        next()
      } else {
        res.send({
          success: false,
          message: 'You dont have permission to access this page.'
        })
      }
    } catch (e) {
      res.send({
        success: false,
        message: 'unauthorized'
      })
    }
  } else {
    res.send({
      success: false,
      message: 'unauthorized'
    })
  }
})

router.get('/', async (req, res) => {
  const series = await Serie.find({})

  res.send(series)
})

router.post('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  await Serie.remove({ _id: req.params.id })
  res.send({
    success: true
  })
})

router.get('/:id', async (req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  res.json(serie)
})

router.put('/:id', async (req, res) => {
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
