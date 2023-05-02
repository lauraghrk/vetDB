var express = require('express');
var router = express.Router();
const db = require('../db')

async function selectId(id) {
  const list = await db.listAll()
  return list.filter( pet => pet._id == id)
}

/* GET home page. */
router.get('/', async (req, res, next) => {
  const list = await db.listAll()
  res.render('index', { list });
});

router.get('/:_id', async (req, res) => {
  const json = selectId(req.params.id)
  res.render('pet')
})

router.get('/register', async (req, res, next) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const pet = req.body
  const result = await db.register(pet)
  console.log(result)
  res.redirect('..')
})

module.exports = router;
