const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
let app = express();

const API_KEY = process.env.API_KEY;
const ConnectDB = async () => {
  try {
    await mongoose.connect(API_KEY);
    console.log('connected to DB');
  } catch (err) {
    console.log('error on connecting');
  }
};

app.get('/ping', (req, res) => {
  res.send(`<h1>first html</h1>`);
});

ConnectDB();

app.listen(8080, () => {
  console.log('Port listening to 8080 port');
});
