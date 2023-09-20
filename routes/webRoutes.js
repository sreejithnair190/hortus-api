const express = require("express");
const webController = require("./../controller/webController");

const router = express.Router();

router.get("/", webController.home_url);
//router.post("/test-email", webController.test_email);

module.exports = router;
