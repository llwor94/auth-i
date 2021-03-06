const helpers = require('../data/helpers');
const express = require('express');
const router = express.Router();

router.post('/register', (req, res, next) => {
  helpers
    .register(req.body)
    .then(response => res.status(201).json(response))
    .catch(next);
});

router.post('/login', (req, res, next) => {
  let body = req.body;
  helpers
    .login(body)
    .then(response => {
      if (response) {
        req.session.name = body.username;
        res.status(200).json(req.session.name);
      } else res.json(null);
    })
    .catch(next);
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        next(err);
      } else res.send('goodbye');
    });
  }
});

module.exports = router;
