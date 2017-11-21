const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./gameRoutes.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../client')));

app.use('/game', router)

app.listen('3000', () => {
  console.log('app is listening on port 3000');
});
