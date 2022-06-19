const express = require('express');
const { auth } = require('../../middleware/auto');
const router = express.Router();
const User = require('../../models/User');

router.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save()
    .then((user) => res.status(200).json({ success: true }))
    .catch((err) => res.json({ success: false, err }));
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      user.comparePassword(req.body.password, (err, invalid) => {
        if (err) return res.status(400).send(err);
        if (!invalid) return res.json({ loginSuccess: false, message: "incorrect password" });

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          res.cookie('x_auth', user.token)
            .status(200)
            .json({ loginSuccess: true, userID: user._id });
        });
      });
    })
    .catch((err) => res.json({ loginSuccess: false, message: "not found email" }));
});

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });

    res.status(200).send({ success: true });
  });
});

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    isAuth: true
  });
});

module.exports = router;