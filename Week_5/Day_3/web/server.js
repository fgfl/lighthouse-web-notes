require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const villainRouter = require('./routes/villains');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use('/villains', villainRouter);
app.use(morgan('dev'));

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
