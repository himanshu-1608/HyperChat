const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secret, times } = require('../config');

exports.hashPassword = async (password) => {
    try {
      let hashedPassword;
      hashedPassword = await bcrypt.hash(password, times);
      return hashedPassword;
    } catch(err) {
      console.log('Error at auth-utils-> hashPassword: ', err);
      throw new Error(err);
    }
};

exports.createToken = (userId) => {
  let token;
  token = jwt.sign({userId},secret);
  return token;
};

exports.checkPassword = async (password1, password2) => {
  return await bcrypt.compare(password1, password2);
};