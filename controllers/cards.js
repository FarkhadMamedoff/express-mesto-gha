const Card = require('../models/card');
const status = require('../utils/status');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(status.OK).send({ cards }))
    .catch(() => res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.status(status.OK).send({ card });
      } else {
        res.status(status.NOTFOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(status.ERROR).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(status.CREATED).send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(status.ERROR).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.status(status.OK).send({ card });
      } else {
        res.status(status.NOTFOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(status.ERROR).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.status(status.OK).send({ card });
      } else {
        res.status(status.NOTFOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(status.ERROR).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};
