const express = require('express');
const plantController = require('../controller/plantController')

const route = express.Router()

route
    .get('/', plantController.get_plants)

module.exports = route