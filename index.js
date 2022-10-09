const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = reuqire('mongoose');
const { v4: uuidv4 } = require('uuid');

mongoose.connect(process.env.MONGOURI, (err) => err || console.log('could not connect to DB') || console.log('connected successfully'));

app.use(cors());

app.get('/', async (req, res) => {
  res.send('This is the api for my cheesy app')
})

app.get('/recipes', (req, res) => {
  res.json(({hello: 'world'}));
});

app.listen(3000, () => {
  console.log('api running')
});