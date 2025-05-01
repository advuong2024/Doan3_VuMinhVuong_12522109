const express = require("express");
var router = express.Router();
const upload = require("../middlewares/multerConfig");
const { uploadImage } = require("../controllers/upload.controller");

router.post("/uploadImage", upload.single("image"), uploadImage);

module.exports = router;