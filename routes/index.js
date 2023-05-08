var express = require('express');
var router = express.Router();
const db = require('../db')

async function selectById(id) {
  const list = await db.listAll()
  const pet = list.filter(pet => pet._id == id)
  const petData = pet[0]
  return petData
}

/* GET home page. */
router.get('/', async (req, res, next) => {
  const list = await db.listAll()
  res.render('index', { list });
});

router.get('/:_id', async (req, res) => {
  const pet = await selectById(req.params._id)
  res.render('pet', { pet })
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

/*router.delete('/delete/:_id', async (req, res) => {
  const id = req.params._id
  const result = await db.remove(id)
  console.log(result)
  res.redirect('..')
})*/

module.exports = router;
