const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Model = require('../model');
const Joi = require('joi');
const bcrypt = require('bcrypt');
let router = express.Router();
router.use(express.json());

const userJoiSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(40).required(),
  email: Joi.string().email().required(),
  confirmemail: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmpassword: Joi.string()
    .required(),
  gender: Joi.string().required(),
});

const userModelSchema = new mongoose.Schema({
  name: String,
  // profile: String,
  email: String,
  password: String,
  gender: String,
});

const User = mongoose.model('AuthDB', userModelSchema);

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

router.post('/signup', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.send({ message: 'get out' });
  } else {
    const { error, value } = userJoiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (req.body.email !== req.body.confirmemail) {
      return res.status(400).json({ message: 'Emails do not match' });
    }
    if (req.body.password !== req.body.confirmpassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(value.password, salt);
      const newUser = await User.create({ ...value, password: hashedPassword });
      res.send({ message: 'ok' });
    } catch (error) {
      console.log(error);
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    if (user && bcrypt.compare(req.body.password, user.password)) {
      res.json(user);
    } else {
      res.send({ message: 'Check the credentials Please...' });
    }
  } catch (error) {
    console.log(error);
    res.send('Error in login');
  }
});

module.exports = router;
