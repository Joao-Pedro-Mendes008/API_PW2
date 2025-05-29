const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middlewares/authMiddlewares')

const userController = require('../Controllers/userCtrl');

router.get("/user" , userController.listUsers);

router.patch("/user/:id/activate", authenticateToken, userController.activateUser);
router.patch("/user/:id/deactivate", authenticateToken, userController.deactivateUser);
router.patch("/user/:id/password", authenticateToken, userController.updatePassword);
router.patch("/user/:id/updateUser", authenticateToken, userController.updateUser);

module.exports = router;