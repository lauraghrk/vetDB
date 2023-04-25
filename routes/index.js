var express = require('express');
var router = express.Router();
const db = require('../db')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const list = await db.listAll()
  res.render('index', { list });
});

router.post("/register", async (req, res) => {
  const pet = req.body
  const result = await db.register(pet)
  console.log(result)
  res.send("Successful new register!")
})

module.exports = router;
