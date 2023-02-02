const jwt = require('jsonwebtoken');
const UserPassError = require('../errors/user-pass-err');
const Constants = require('../utils/constants');

const extractBearerToken = function (header) {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  if (req.headers.authorization === undefined) {
    throw new UserPassError(Constants.JWT_PROBLEM);
  }
  const { authorization } = req.headers;
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
    req.user = payload;
    next();
  } catch (e) {
    next(new UserPassError(Constants.JWT_PROBLEM));
  }
  return null;
};
