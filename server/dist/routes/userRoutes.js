"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public routes
router.post('/register', userController_1.register);
router.post('/login', userController_1.login);
router.post('/check', userController_1.checkUser);
// Protected routes
router.get('/', auth_1.authenticateToken, auth_1.requireAdmin, userController_1.getAllUsers);
router.get('/:id', auth_1.authenticateToken, userController_1.getUserById);
router.post('/', auth_1.authenticateToken, auth_1.requireAdmin, userController_1.createUser);
router.post('/create-admin', auth_1.authenticateToken, auth_1.requireAdmin, userController_1.createAdmin);
router.put('/:id', auth_1.authenticateToken, userController_1.updateUser);
router.delete('/:id', auth_1.authenticateToken, auth_1.requireAdmin, userController_1.deleteUser);
exports.default = router;
