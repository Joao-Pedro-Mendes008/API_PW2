const express = require('express');
const router = express.Router();

const searchUser = require('../Controllers/searchUserController');

router.get('/searchUser/:id', searchUser.searchUserController);

module.exports = router