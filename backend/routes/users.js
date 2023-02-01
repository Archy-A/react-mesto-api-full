const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersController = require('../controllers/users');
const Constants = require('../utils/constants');

router.get('/me', usersController.getMe);

router.get('/', usersController.getUsers);

router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    }),
  }),
  usersController.getUser,
);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), usersController.updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2).pattern(Constants.REGEXPHTTP),
  }),
}), usersController.updateAvaUser);

module.exports = router;
