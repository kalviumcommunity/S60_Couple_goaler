const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const UserRouter = require('./Routes/Routes.js');

let app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', UserRouter);

const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT;
const ConnectDB = async () => {
  try {
    await mongoose.connect(API_KEY);
    console.log('connected to DB');
  } catch (err) {
    console.log('error on connecting', err.message);
  }
  console.log('connected');
};

const schema = new mongoose.Schema({
  places: String,
  Rating: Number,
  PriceApprox: Number,
});

// const Model = mongoose.model('location', schema);

app.listen(PORT, async () => {
  console.log(`Port listening to ${PORT} port`);
  await ConnectDB();
});

// module.exports = { Model };
