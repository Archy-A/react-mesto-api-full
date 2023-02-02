const Card = require('../models/card');
const Constants = require('../utils/constants');
const OwnerError = require('../errors/owner-err');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/user-id-err');

exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send({
        name: card.name,
        link: card.link,
        owner: card.owner,
        _id: card._id,
      });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError(Constants.HTTP_BAD_REQUEST));
      } else {
        next(e);
      }
    });
};

exports.deleteCard = async (req, res, next) => {
  try {
    const cardb = await Card.findOne({ _id: req.params.id });
    const owner = req.user._id;
    if (cardb == null) {
      next(new NotFoundError(Constants.CARD_NOT_EXIST));
    } else if (cardb.owner.valueOf() === owner) {
      Card.findByIdAndRemove(req.params.id).then((card) => {
        res.send({
          name: card.name,
          link: card.link,
          owner: card.owner,
          _id: card._id,
        });
      });
    } else {
      next(new OwnerError(Constants.OWNER_WRONG));
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError(Constants.HTTP_BAD_REQUEST));
    } else {
      next(e);
    }
  }
};

exports.likeCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({
          name: card.name,
          link: card.link,
          owner: card.owner,
          _id: card._id,
        });
      } else {
        next(new NotFoundError(Constants.CARD_NOT_FOUND));
      }
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError(Constants.HTTP_BAD_REQUEST));
      } else {
        next(e);
      }
    });
};

exports.dislikeCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({
          name: card.name,
          link: card.link,
          owner: card.owner,
          _id: card._id,
        });
      } else {
        next(new NotFoundError(Constants.CARD_NOT_FOUND));
      }
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError(Constants.HTTP_BAD_REQUEST));
      } else {
        next(e);
      }
    });
};
