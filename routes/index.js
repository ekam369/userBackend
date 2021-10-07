const express = require('express');
const { saveUser, getUsers } = require('../controllers/user');
const api = express.Router();

api.route("/user")
    .post(saveUser)
    .get(getUsers);

module.exports = api;