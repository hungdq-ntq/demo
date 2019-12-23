const express = require('express');
const router = express.Router();

router.use('/org', require('./org.api'));

module.exports = router;
