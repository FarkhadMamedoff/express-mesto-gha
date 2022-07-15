const User = require('../models/user');
const status = require('../utils/status');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(status.OK).send({ users }))
    .catch(() => res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.status(status.OK).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(status.NOTFOUND).send({ message: 'Пользователь не найден' });
      } else if (err.name === 'ValidationError') {
        res.status(status.ERROR).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(status.CREATED).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(status.ERROR).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(status.OK).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(status.NOTFOUND).send({ message: 'Пользователь не найден' });
      } else if (err.name === 'ValidationError') {
        res.status(status.ERROR).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.status(status.OK).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(status.NOTFOUND).send({ message: 'Пользователь не найден' });
      } else if (err.name === 'ValidationError') {
        res.status(status.ERROR).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};
