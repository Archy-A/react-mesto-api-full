const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cardsController = require('../controllers/cards');
const Constants = require('../utils/constants');

router.get('/', cardsController.getCards);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  }),
}), cardsController.deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).pattern(Constants.REGEXPHTTP),
  }),
}), cardsController.createCard);

router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  }),
}), cardsController.likeCard);

router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  }),
}), cardsController.dislikeCard);

module.exports = router;
