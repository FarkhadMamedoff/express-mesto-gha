const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const status = require('./utils/status');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62d075ec8bb15b59231bccb7',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(status.NOTFOUND).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
