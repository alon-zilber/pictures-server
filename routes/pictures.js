const express = require("express");
const router = express.Router();
const picturesController = require("../controllers/picturesController");

router.get("/", picturesController.getAllPictures);

module.exports = router;
