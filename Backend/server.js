const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

let app = express();

app.use(cors());
app.use(bodyParser.json());

const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT
const ConnectDB = async () => {
  try {
    await mongoose.connect(API_KEY);
    console.log('connected to DB');
  } catch (err) {
    console.log('error on connecting', err.message);
  }
  console.log("connected")
};
app.get('/store', (req, res) => {
  Model.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err, 'error');
    });
  // res.send('hello');
});

// app.post('/store', async (req, res) => {
//   // console.log('data received',req.body);
//   console.log(req.body);
//   res.send(req.body);
//   await Model.create(req.body);
// });

// app.put('/store/:id', async (req, res) => {
//   await Model.findByIdAndUpdate({ _id: req.params.id }, req.body);
//   console.log('added');
//   res.send('data Updated');
// });

// app.delete('/store/:id', async (req, res) => {
//   try {
//     const deleted = await Model.findByIdAndDelete(req.params.id);
//     console.log(deleted);
//     res.send('deleted');
//   } catch {
//     (error) => {
//       console.log(error);
//     };
//   }
// });

const schema = new mongoose.Schema({
  places: String,
  Rating: Number,
  PriceApprox: Number,
});

const Model = mongoose.model('location', schema);


app.listen(PORT, async () => {
  console.log(`Port listening to ${PORT} port`);
  await ConnectDB();
});
