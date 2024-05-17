const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Model = require('../model');
let router = express.Router();
router.use(express.json());
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

router.post('/store', async (req, res) => {
  //   // console.log('data received',req.body);
  //   console.log(req.body);
  //   res.send(req.body);
  //   await model.create(req.body);
  try {
    const newModel = new Model(req.body);
    await newModel.save();
    res.json(newModel);
  } catch (Error) {
    res.status(500).send('An error occurred');
  }
});

router.put('/store/:id', async (req, res) => {
  await Model.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.send('data Updated');
});

router.delete('/store/:id', async (req, res) => {
  try {
    const deleted = await Model.findByIdAndDelete(req.params.id);
    console.log(deleted);
    res.send('deleted');
  } catch {
    (error) => {
      console.log(error);
    };
  }
});

module.exports = router;
