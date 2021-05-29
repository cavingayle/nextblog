const express = require('express');
const router = express.Router();

// import middlewares
const { requireSignin, authMiddleware, adminMiddleware } = require('../controller/auth');

// import controllers
const { read } = require('../controller/user');

// routes
router.get('/user', requireSignin, authMiddleware, read);
router.get('/admin', requireSignin, adminMiddleware, read);

module.exports = router;
