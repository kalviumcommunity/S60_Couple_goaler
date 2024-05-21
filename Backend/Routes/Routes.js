const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Model = require('../model');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let router = express.Router();
router.use(express.json());

// added joi schema for validation
const userJoiSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(40).required(),
  email: Joi.string().email().required(),
  confirmemail: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  confirmpassword: Joi.string().min(3).required(),
  gender: Joi.string().required(),
});

const userModelSchema = new mongoose.Schema({
  name: String,
  // profile: String,
  email: String,
  password: String,
  token: String,
  gender: String,
  token: String,
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
  const token = jwt.sign(req.body, process.env.password);
  console.log(token);
  if (user) {
    res.send({ message: 'done' });
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
      const newUser = await User.create({
        ...value,
        password: hashedPassword,
        token: token,
      });
      res.send({ message: 'ok' });
    } catch (error) {
      console.error({ message: 'Error during signup', error });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.log(error);
    res.send('Error in login');
  }
});

module.exports = router;
