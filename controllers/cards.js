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
      res.status(status.OK).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(status.NOTFOUND).send({ message: 'Карточка не найдена' });
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
  Card.findOneAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      res.status(status.OK).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(status.NOTFOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findOneAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      res.status(status.OK).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(status.NOTFOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(status.INTERNALERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};
