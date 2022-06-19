const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const configOption = require('../config/configOption');

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  token: {
    type: String
  }
});

// TODO. password 암호화
userSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(configOption.saltRound, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  const user = this;
  bcrypt.compare(plainPassword, user.password)
    .then((invalid) => callback(null, invalid))
    .catch((err) => callback(err));
};

userSchema.methods.generateToken = function (callback) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), configOption.jwtKey);
  user.token = token;
  user.save()
    .then((user) => callback(null, user))
    .catch((err) => callback(err));
};

userSchema.statics.findByToken = function (token, callback) {
  const user = this;
  jwt.verify(token, configOption.jwtKey, (err, decoded) => {
    user.findOne({ _id: decoded, token: token })
      .then((user) => callback(null, user))
      .catch((err) => callback(err));
  });
};

module.exports = mongoose.model('User', userSchema);