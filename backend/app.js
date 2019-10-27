const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const app = express();

const password = 'AjdiVFdImjV7Lic5';
const queryString = `mongodb+srv://marko:${password}@cluster0-tiqpu.mongodb.net/mean-app?retryWrites=true&w=majority`;

mongoose
  .connect(queryString)
  .then(() => {
    console.log('Conntected to mongo');
  })
  .catch(err => {
    console.log('Error occurred', err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// forward localhost/images
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, OPTIONS, DELETE'
  );
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;