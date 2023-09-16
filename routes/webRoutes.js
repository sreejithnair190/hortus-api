const express = require('express');
const webController = require('./../controller/webController');

const router = express.Router();

router.get("/", webController.home_url);

module.exports = router;