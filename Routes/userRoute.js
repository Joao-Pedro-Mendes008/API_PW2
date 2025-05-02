const express = require('express');
const router = express.Router();

const searchUser = require("../Controllers/showUsers");

router.get("/showUsers", searchUser.showUsers);

module.exports = router;