var express = require('express');
var router = express.Router();
const benhnhanController = require("../controllers/benhnhan.controller");
router.get('/', benhnhanController.getAll);
router.get('/:id',  benhnhanController.getById);
router.post('/',  benhnhanController.insert);
router.put('/:id',  benhnhanController.update);
router.delete('/:id', benhnhanController.delete);
module.exports = router;
