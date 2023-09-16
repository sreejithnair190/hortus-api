const dotenv = require("dotenv");

dotenv.config();

exports.ENV = process.env.NODE_ENV;

exports.API_URL = process.env.API;