var express = require('express');
var router = express.Router();
const dichvuController = require("../controllers/dichvu.controller");
router.get('/', dichvuController.getAll);
router.get('/:id',  dichvuController.getById);
router.post('/',  dichvuController.insert);
router.put('/:id',  dichvuController.update);
router.delete('/:id', dichvuController.delete);
module.exports = router;
