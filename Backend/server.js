const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
let app = express();
app.use(cors());
const API_KEY = process.env.API_KEY;
const ConnectDB = async () => {
  try {
    await mongoose.connect(API_KEY);
    console.log('connected to DB');
  } catch (err) {
    console.log('error on connecting', err.message);
  }
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

const schema = new mongoose.Schema({
  places: String,
  Rating: Number,
  PriceApprox: Number,
});

const Model = mongoose.model('location', schema);
// const insertSampleData = () => {
//   Model.insertMany([
//     {
//       places: 'Goa',
//       Rating: 4.5,
//       PriceApprox: 100000,
//     },
//     {
//       places: 'Shimla',
//       Rating: 4.4,
//       PriceApprox: 50000,
//     },
//     {
//       places: 'Srinagar',
//       Rating: 3,
//       PriceApprox: 60000,
//     },
//     {
//       places: 'Darjeeling',
//       Rating: 4,
//       PriceApprox: 50000,
//     },
//     {
//       places: 'Munnar',
//       Rating: 4,
//       PriceApprox: 25000,
//     },
//     {
//       places: 'Ooty',
//       Rating: 4,
//       PriceApprox: 15000,
//     },
//     {
//       places: 'Pondicherry',
//       Rating: 3,
//       PriceApprox: 25000,
//     },
//     {
//       places: 'Coorg',
//       Rating: 3,
//       PriceApprox: 30000,
//     },
//     {
//       places: 'Agra',
//       Rating: 3.5,
//       PriceApprox: 50000,
//     },
//     {
//       places: 'Alleppey',
//       Rating: 4.5,
//       PriceApprox: 30000,
//     },
//   ])

//     .then((res) => {
//       console.log('created');
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

app.listen(8080, () => {
  ConnectDB();

  console.log('Port listening to 8080 port');
});