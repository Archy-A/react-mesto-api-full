const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const auth = require('./middlewares/auth');
const Constants = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1/mestodb2');

// const allowedCors = [
//   'https://testdeploy.nomoredomainsclub.ru',
//   'http://testdeploy.nomoredomainsclub.ru',
//   'localhost:3000'
// ];
// app.use(function(req, res, next) {
//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
//   const requestHeaders = req.headers['access-control-request-headers'];
//   if (method === 'OPTIONS') {
//       res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//       res.header('Access-Control-Allow-Headers', requestHeaders);
//       return res.end();
//   }
//   const { origin } = req.headers;
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   next();
// });
app.use(function(req, res, next) {
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers['access-control-request-headers'];
  const { origin } = req.headers;
  res.header('Access-Control-Allow-Origin', "*");
  res.status(200);
  console.log(' =================== res.header = ', res.header)
  next();
});

app.use(requestLogger);

const signup = require('./routes/signup');

app.use('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).pattern(Constants.REGEXPHTTP),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), signup);

const login = require('./routes/login');

app.use('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).pattern(Constants.REGEXPHTTP),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

const cardsRouter = require('./routes/cards');

app.use('/cards', cardsRouter);

const unexistRouter = require('./routes/unexist');

app.use('/', unexistRouter);

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  console.log('error = ', err);
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла какая-то ошибка, ...........................'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log('--------------------------');
  console.log('                          ');
  console.log('SERVER HAS BEEN STARTED!!!');
  console.log('                          ');
  console.log('--------------------------');
});
