var express = require('express');
var router = express.Router();
const db = require('../db')

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'vetDB' });
});

router.post("/register", async (req, res) => {
  const pet = req.body
  const result = await db.register(pet)
  console.log(result)
  res.end()
})

module.exports = router;
