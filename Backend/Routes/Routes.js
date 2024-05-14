const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

let router = express.Router();

router.get('/store', (req, res) => {
  Model.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err, 'error');
    });
  // res.send('hello');
});

module.exports = router;
