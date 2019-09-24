const { Bearer, Basic } = require('permit');
const jwt = require('jsonwebtoken');
const { findUser } = require('../models/User');

const SECRET_KEY = require('../config/keys').TOKEN_SECRET;

const permit = new Bearer();

exports.authenticate = async (req, res, next) => {
  const token = await permit.check(req);
  try {
    if (!token) {
      permit.fail(res);
      res.status(403);
    }

    const user = jwt.verify(token, SECRET_KEY);
    if (!user) {
      permit.fail(res);
      res.status(403);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    console.error(err);
  }
};
