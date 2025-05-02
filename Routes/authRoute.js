const express = require('express');
const router = express.Router();

const authUser = require('../Controllers/authController')

router.post('/authUser/:id/login', authUser.login)
router.post('/authUser/:id/register', authUser.register)

module.exports = router